// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

// ==================== External Imports ====================

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import { ERC20Permit } from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import { ERC20Burnable } from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

/// @title TestCoin
/// @author Danile Liu
/// @notice Compatible with OpenZeppelin Contracts ^5.0.0
/// @custom:contact 139250065@qq.com
contract TestCoin is ERC20, ERC20Burnable, ERC20Permit {
    // ==================== Constructor function ====================

    /// @dev Mint 1_000_000 ethers to deployer
    /// @param name The name of token
    /// @param symbol The symbol of token
    constructor(string memory name, string memory symbol) ERC20(name, symbol) ERC20Permit(name) {
        _mint(msg.sender, 1_000_000 ether);
    }

    // ==================== External functions ====================

    /// @notice Anyone can call this function
    /// @param to The receiver of token
    /// @param amount The quantity to mint
    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }
}
