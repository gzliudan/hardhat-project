// SPDX-License-Identifier: MIT

pragma solidity ^0.8.28;

/* solhint-disable no-inline-assembly */
/* solhint-disable gas-custom-errors */

/**
 * @title MCopy
 * @dev A contract demonstrating the usage of mcopy instruction
 * @notice This contract shows how to use mcopy for efficient memory copying
 * @author Daniel Liu <139250065@qq.com>
 */
contract MCopy {
    /**
     * @dev Demonstrates copying a word (32 bytes) using mcopy
     * @param source The source word to copy
     * @return The copied word
     */
    function copyWord(bytes32 source) external pure returns (bytes32) {
        bytes32 result;
        assembly {
            // Allocate memory for source and destination
            let src := mload(0x40)
            let dst := add(src, 0x20)

            // Store source data
            mstore(src, source)

            // Copy 32 bytes from src to dst
            mcopy(dst, src, 32)

            // Load the result
            result := mload(dst)
        }
        return result;
    }

    /**
     * @dev Demonstrates copying a byte array using mcopy
     * @param source The source byte array to copy
     * @return The copied byte array
     */
    function copyByteArray(bytes calldata source) external pure returns (bytes memory) {
        require(source.length > 0, "Source array cannot be empty");

        // Create a new bytes array in memory
        bytes memory result = new bytes(source.length);

        assembly {
            // Get the memory pointers
            let dstPtr := add(result, 0x20) // Skip the length field

            // First copy data from calldata to memory
            let tempPtr := mload(0x40) // Get free memory pointer
            calldatacopy(tempPtr, source.offset, source.length)

            // Then use mcopy to copy from temp location to result
            mcopy(dstPtr, tempPtr, source.length)
        }

        return result;
    }

    /**
     * @dev Demonstrates multiple copies using mcopy
     * @param source The source word to copy
     * @param count The number of copies to perform
     * @return An array of copied values
     */
    function copyMultipleWord(bytes32 source, uint256 count) external pure returns (bytes32[] memory) {
        bytes32[] memory result = new bytes32[](count);

        assembly {
            // Get the pointer to the array data
            let dataPtr := add(result, 0x20)

            // Store source data in memory
            let src := mload(0x40)
            mstore(src, source)

            // Perform multiple copies
            for {
                let i := 0
            } lt(i, count) {
                i := add(i, 1)
            } {
                let currentDst := add(dataPtr, mul(i, 0x20))
                mcopy(currentDst, src, 32)
            }
        }

        return result;
    }

    /**
     * @dev Demonstrates copying with offset using mcopy
     * @param source The source byte array to copy
     * @param offset The offset to start copying from
     * @param length The length to copy
     * @return The copied byte array
     */
    function copyWithOffset(
        bytes calldata source,
        uint256 offset,
        uint256 length
    ) external pure returns (bytes memory) {
        require(offset + length <= source.length, "Invalid offset or length");

        // Create a new bytes array in memory
        bytes memory result = new bytes(length);

        assembly {
            // Get the memory pointers
            let dstPtr := add(result, 0x20) // Skip the length field

            // First copy data from calldata to memory
            let tempPtr := mload(0x40) // Get free memory pointer
            calldatacopy(tempPtr, add(source.offset, offset), length)

            // Then use mcopy to copy from temp location to result
            mcopy(dstPtr, tempPtr, length)
        }

        return result;
    }
}
