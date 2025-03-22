// SPDX-License-Identifier: MIT

pragma solidity ^0.8.28;

/**
 * @title CustomError
 * @dev Demonstrates the usage of custom errors
 * @author Daniel Liu <139250065@qq.com>
 */
contract CustomError {
    // Custom error definitions
    error InsufficientBalance(uint256 requested, uint256 available);
    error InvalidAmount(uint256 amount);
    error InvalidAddress(address addr);
    error ArrayLengthMismatch(uint256 expected, uint256 actual);

    uint256 public balance;
    address public owner;
    uint256[] public numbers;

    constructor() {
        owner = msg.sender;
        balance = 1000;
        numbers = [1, 2, 3, 4, 5];
    }

    /**
     * @dev Check balance using require and custom error
     */
    function withdraw(uint256 amount) external view {
        require(amount > 0, InvalidAmount(amount));
        require(amount <= balance, InsufficientBalance(amount, balance));
    }

    /**
     * @dev Check address using require and custom error
     */
    function setOwner(address newOwner) external view {
        require(newOwner != address(0), InvalidAddress(newOwner));
        require(newOwner != owner, InvalidAddress(newOwner));
    }

    /**
     * @dev Check array length using require and custom error
     */
    function updateNumbers(uint256[] calldata newNumbers) external view {
        require(newNumbers.length == numbers.length, ArrayLengthMismatch(numbers.length, newNumbers.length));
    }

    /**
     * @dev Perform complex checks using require and custom errors
     */
    function complexOperation(uint256 amount, address target) external view {
        require(amount > 0, InvalidAmount(amount));
        require(amount <= balance, InsufficientBalance(amount, balance));
        require(target != address(0), InvalidAddress(target));
    }
}
