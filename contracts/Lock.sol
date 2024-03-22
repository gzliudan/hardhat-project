// SPDX-License-Identifier: MIT

pragma solidity ^0.8.23;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Lock {
    error EarlyTime(uint256 time);
    error NotOwner(address who);

    event Withdrawal(uint256 amount, uint256 when);

    uint256 public unlockTime;
    address payable public owner;

    constructor(uint256 unlockTime_) payable {
        if (block.timestamp >= unlockTime_) {
            revert EarlyTime(unlockTime_);
        }

        unlockTime = unlockTime_;
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
