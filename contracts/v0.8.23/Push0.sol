// SPDX-License-Identifier: MIT

pragma solidity >=0.8.20 <=0.8.23;

/**
 * @title Push0
 * @dev A simple contract demonstrating the PUSH0 opcode functionality
 * @notice This contract provides basic functionality to store and retrieve a number
 * @author Daniel Liu <139250065@qq.com>
 */
contract Push0 {
    /**
     * @dev Public state variable to store a number
     */
    uint256 public num;

    /**
     * @dev Sets the value of the stored number
     * @param n The new number to be stored
     * @notice This function updates the public state variable 'num'
     */
    function setNum(uint256 n) external {
        num = n;
    }
}
