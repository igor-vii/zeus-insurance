// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

/**
 * @title Lock
 * @dev A time-locked ETH vault — funds can only be withdrawn after an unlock time.
 *      Useful as a simple escrow or vesting primitive.
 */
contract Lock {
    uint256 public unlockTime;
    address payable public owner;

    event Withdrawal(uint256 amount, uint256 when);

    constructor(uint256 _unlockTime) payable {
        require(
            block.timestamp < _unlockTime,
            "Unlock time should be in the future"
        );
        unlockTime = _unlockTime;
        owner = payable(msg.sender);
    }

    function withdraw() public {
        require(block.timestamp >= unlockTime, "You can't withdraw yet");
        require(msg.sender == owner, "You aren't the owner");

        uint256 amount = address(this).balance;
        emit Withdrawal(amount, block.timestamp);
        (bool ok, ) = owner.call{value: amount}("");
        require(ok, "Transfer failed");
    }
}
