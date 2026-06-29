// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ZeusInsurance is ReentrancyGuard, Ownable {
    IERC20 public usdc;

    struct Policy {
        address buyer;
        address seller;
        uint256 amount;         // insured transaction amount
        uint256 premium;        // premium paid
        uint256 retryDeadline;  // end of timeout window
        uint256 maxRetries;     // number of allowed retries
        bool isActive;
        bool isPaidOut;         // payout executed
        bool isExpired;         // policy expired
    }

    mapping(uint256 => Policy) public policies;
    uint256 public nextPolicyId;

    // Reserve fund (can be managed via a separate contract)
    uint256 public reserveBalance;

    event PolicyCreated(uint256 indexed policyId, address indexed buyer, address indexed seller, uint256 amount, uint256 premium, uint256 retryDeadline);
    event PayoutExecuted(uint256 indexed policyId, uint256 amount);
    event PolicyExpired(uint256 indexed policyId);

    constructor(address _usdc) Ownable(msg.sender) {
        usdc = IERC20(_usdc);
    }

    // Buy insurance: transfer premium into contract, create policy
    function buyInsurance(
        address seller,
        uint256 amount,
        uint256 timeoutSeconds,
        uint256 maxRetries
    ) external nonReentrant {
        require(seller != address(0), "Invalid seller");
        require(amount > 0, "Amount must be > 0");
        require(maxRetries > 0 && maxRetries <= 10, "Invalid retries");
        require(timeoutSeconds > 0, "Timeout must be > 0");

        // Premium: 7% base + 2% per additional retry
        uint256 premiumBps = 700 + (maxRetries - 1) * 200;
        uint256 premium = (amount * premiumBps) / 10000;

        // Transfer premium from buyer into contract (reserve)
        require(usdc.transferFrom(msg.sender, address(this), premium), "Premium transfer failed");

        uint256 retryDeadline = block.timestamp + timeoutSeconds * maxRetries;

        policies[nextPolicyId] = Policy({
            buyer: msg.sender,
            seller: seller,
            amount: amount,
            premium: premium,
            retryDeadline: retryDeadline,
            maxRetries: maxRetries,
            isActive: true,
            isPaidOut: false,
            isExpired: false
        });

        reserveBalance += premium;

        emit PolicyCreated(nextPolicyId, msg.sender, seller, amount, premium, retryDeadline);
        nextPolicyId++;
    }

    // Claim payout (buyer submits if seller did not fulfil)
    function claimPayout(uint256 policyId) external nonReentrant {
        Policy storage p = policies[policyId];
        require(p.buyer == msg.sender, "Only buyer can claim");
        require(p.isActive, "Policy not active");
        require(!p.isPaidOut, "Already paid out");
        require(!p.isExpired, "Policy expired");

        // Timeout must have elapsed
        require(block.timestamp >= p.retryDeadline, "Timeout not yet reached");

        // Reserve must be sufficient
        uint256 payoutAmount = p.amount;
        require(reserveBalance >= payoutAmount, "Insufficient reserve");

        // Pay out to buyer
        p.isPaidOut = true;
        p.isActive = false;
        reserveBalance -= payoutAmount;
        require(usdc.transfer(p.buyer, payoutAmount), "Payout transfer failed");

        emit PayoutExecuted(policyId, payoutAmount);
    }

    // Admin: deposit into reserve
    function depositReserve(uint256 amount) external onlyOwner {
        require(usdc.transferFrom(msg.sender, address(this), amount), "Deposit failed");
        reserveBalance += amount;
    }

    // Admin: withdraw from reserve (management only, not for claim payouts)
    function withdrawReserve(uint256 amount) external onlyOwner {
        require(reserveBalance >= amount, "Insufficient reserve");
        reserveBalance -= amount;
        require(usdc.transfer(msg.sender, amount), "Withdraw failed");
    }

    // Get policy details
    function getPolicy(uint256 policyId) external view returns (Policy memory) {
        return policies[policyId];
    }

    // Get reserve balance
    function getReserveBalance() external view returns (uint256) {
        return reserveBalance;
    }
}
