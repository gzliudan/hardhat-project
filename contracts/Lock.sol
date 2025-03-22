// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.23;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Lock {
    error EarlyTime(uint256 time);
    error NotOwner(address who);

    uint256 public unlockTime;
    address payable public owner;

    event Withdrawal(uint256 amount, uint256 when);

    constructor(uint256 _unlockTime) payable {
        if (block.timestamp >= _unlockTime) {
            revert EarlyTime(_unlockTime);
        }

        unlockTime = _unlockTime;
        owner = payable(msg.sender);
    }

    function withdraw() public {
        // Uncomment this line, and the import of "hardhat/console.sol", to print a log in your terminal
        // console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp);

        if (block.timestamp < unlockTime) {
            revert EarlyTime(block.timestamp);
        }
        if (msg.sender != owner) {
            revert NotOwner(msg.sender);
        }

        emit Withdrawal(address(this).balance, block.timestamp);

        owner.transfer(address(this).balance);
    }
}
