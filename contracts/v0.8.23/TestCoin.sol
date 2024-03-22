// SPDX-License-Identifier: MIT

pragma solidity <=0.8.23;

// ==================== External Imports ====================

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import { ERC20Permit } from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import { ERC20Burnable } from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

/**
 * @title TestCoin
 * @dev Implementation of a test token with ERC20, ERC20Burnable, and ERC20Permit functionality
 * @notice This contract implements a test token with minting, burning, and permit capabilities
 * @author Daniel Liu <139250065@qq.com>
 */
contract TestCoin is ERC20, ERC20Burnable, ERC20Permit {
    // ==================== Constructor function ====================

    /**
     * @dev Constructor that initializes the token with name and symbol
     * @param name The name of the token
     * @param symbol The symbol of the token
     * @notice Mints 1,000,000 tokens to the deployer's address
     */
    constructor(string memory name, string memory symbol) ERC20(name, symbol) ERC20Permit(name) {
        _mint(msg.sender, 1_000_000 ether);
    }

    // ==================== External functions ====================

    /**
     * @dev Mints new tokens to a specified address
     * @param to The address to receive the minted tokens
     * @param amount The amount of tokens to mint
     * @notice This function can be called by anyone to mint tokens
     */
    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }
}
