// SPDX-License-Identifier: MIT

pragma solidity ^0.8.23;

contract MhToken {
    error InsufficientToken();

    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    uint256 public totalSupply = 1000000;
    address public owner;

    string public name = "My Hardhat Token";
    string public symbol = "MHT";

    mapping(address => uint256) internal balances;

    constructor() {
        balances[msg.sender] = totalSupply;
        owner = msg.sender;
    }

    function transfer(address to, uint256 amount) external {
        if (balances[msg.sender] < amount) {
            revert InsufficientToken();
        }

        balances[msg.sender] -= amount;
        balances[to] += amount;

        emit Transfer(msg.sender, to, amount);
    }

    function balanceOf(address account) external view returns (uint256) {
        return balances[account];
    }
}
