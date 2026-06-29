// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/// @dev Minimal mintable ERC20 used only in tests — NOT for production.
contract MockUSDC is ERC20 {
    uint8 private _decimals = 6;

    constructor() ERC20("Mock USDC", "USDC") {}

    function decimals() public view override returns (uint8) {
        return _decimals;
    }

    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }
}
