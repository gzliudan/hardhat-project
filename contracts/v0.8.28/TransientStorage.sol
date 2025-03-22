// SPDX-License-Identifier: MIT

pragma solidity ^0.8.28;

/* solhint-disable no-inline-assembly */

/**
 * @title TransientStorage
 * @dev Contract demonstrating EIP-1153 transient storage operations
 * @author Daniel Liu <139250065@qq.com>
 */
contract TransientStorage {
    event UpdateSlot(uint256 oldValue, uint256 newValue);
    event SwapSlots(uint256 newA, uint256 newB);
    event AddSlots(uint256 value1, uint256 value2, uint256 result);

    /**
     * @dev Writes value to a transient storage slot and reads it back
     * @param value The value to write to the slot
     * @return result The value read back from the slot
     */
    function readAndWrite(uint256 value) external returns (uint256 result) {
        uint256 slot = uint256(keccak256(abi.encodePacked(value)));
        assembly {
            tstore(slot, value)
            result := tload(slot)
        }
        emit UpdateSlot(value, result);
        return result;
    }

    /**
     * @dev Swaps values between two transient storage slots
     * @param value1 The first value to swap
     * @param value2 The second value to swap
     * @return newA The new value in the first slot
     * @return newB The new value in the second slot
     */
    function swapSlots(uint256 value1, uint256 value2) external returns (uint256 newA, uint256 newB) {
        uint256 slotA = uint256(keccak256(abi.encodePacked(value1)));
        uint256 slotB = uint256(keccak256(abi.encodePacked(value2)));
        assembly {
            tstore(slotA, value1)
            tstore(slotB, value2)

            newA := tload(slotB)
            newB := tload(slotA)
        }
        emit SwapSlots(newA, newB);
        return (newA, newB);
    }

    /**
     * @dev Adds two values and stores the result in a transient storage slot
     * @param value1 The first value to add
     * @param value2 The second value to add
     * @return result The sum of the two values
     */
    function addSlots(uint256 value1, uint256 value2) external returns (uint256 result) {
        uint256 slot = uint256(keccak256(abi.encodePacked(value1, value2)));
        assembly {
            tstore(slot, value1)
            let tmp1 := tload(slot)
            tstore(slot, value2)
            let tmp2 := tload(slot)
            let sum := add(tmp1, tmp2)
            tstore(slot, sum)
            result := tload(slot)
        }
        emit AddSlots(value1, value2, result);
        return result;
    }
}
