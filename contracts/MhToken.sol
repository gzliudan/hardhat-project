// SPDX-License-Identifier: MIT

pragma solidity ^0.8.23;

/**
 * @title MhToken
 * @dev Implementation of a basic ERC20-like token
 * @notice This contract implements a simple token with transfer functionality
 */
contract MhToken {
    /**
     * @dev Custom error for insufficient token balance
     */
    error InsufficientToken();

    /**
     * @dev Emitted when tokens are transferred from one address to another
     * @param _from The address tokens are transferred from
     * @param _to The address tokens are transferred to
     * @param _value The amount of tokens transferred
     */
    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    /**
     * @dev Total supply of tokens
     */
    uint256 public totalSupply = 1000000;

    /**
     * @dev Address of the contract owner
     */
    address public owner;

    /**
     * @dev Name of the token
     */
    string public name = "My Hardhat Token";

    /**
     * @dev Symbol of the token
     */
    string public symbol = "MHT";

    /**
     * @dev Mapping of addresses to their token balances
     */
    mapping(address => uint256) internal balances;

    /**
     * @dev Constructor that initializes the token supply and assigns it to the deployer
     */
    constructor() {
        balances[msg.sender] = totalSupply;
        owner = msg.sender;
    }

    /**
     * @dev Transfers tokens from the sender to a specified address
     * @param to The address to transfer tokens to
     * @param amount The amount of tokens to transfer
     * @notice Reverts if the sender has insufficient balance
     * @notice Emits a Transfer event on successful transfer
     */
    function transfer(address to, uint256 amount) external {
        if (balances[msg.sender] < amount) {
            revert InsufficientToken();
        }

        balances[msg.sender] -= amount;
        balances[to] += amount;

        emit Transfer(msg.sender, to, amount);
    }

    /**
     * @dev Returns the token balance of a specified address
     * @param account The address to check the balance of
     * @return The token balance of the specified address
     */
    function balanceOf(address account) external view returns (uint256) {
        return balances[account];
    }
}
