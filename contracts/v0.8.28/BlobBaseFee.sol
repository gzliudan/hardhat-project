// SPDX-License-Identifier: MIT

pragma solidity ^0.8.28;

/**
 * @title BlobBaseFee
 * @dev A contract demonstrate blob-related features in solidity v0.8.28
 * @notice This contract provides functionality to retrieve blob base fee and blob hash values
 * @author Daniel Liu <139250065@qq.com>
 */
contract BlobBaseFee {
    /**
     * @dev Retrieves the blob base fee of the current block
     * @notice Returns the blob base fee value of the current block
     * @return uint256 The blob base fee value of the current block
     */
    function getBlobBaseFee() external view returns (uint256) {
        return block.blobbasefee;
    }

    /**
     * @dev Retrieves the blob hash at a specified index position
     * @notice Returns the blob hash value at the specified index position
     * @param index The index position of the blob hash to query
     * @return bytes32 The blob hash value at the specified index position
     */
    function getBlobHashByIndex(uint256 index) external view returns (bytes32) {
        return blobhash(index);
    }

    /**
     * @dev Retrieves multiple consecutive blob hash values
     * @notice Returns an array of blob hash values starting from the specified index
     * @param startIndex The starting index position
     * @param count The number of blob hash values to retrieve
     * @return bytes32[] An array containing the specified number of blob hash values
     */
    function getMultipleBlobHashes(uint256 startIndex, uint256 count) external view returns (bytes32[] memory) {
        bytes32[] memory hashes = new bytes32[](count);
        for (uint256 i = 0; i < count; i++) {
            hashes[i] = blobhash(startIndex + i);
        }
        return hashes;
    }

    /**
     * @dev Retrieves the current chain ID of the network
     * @notice Returns the unique identifier of the current blockchain network
     * @return uint256 The chain ID of the current network
     * @custom:example
     * - XDC main net: 50
     * - XDC test net: 51
     * - XDC dev net: 551
     * - XDC local net: 5151
     */
    function getChainId() external view returns (uint256) {
        return block.chainid;
    }
}
