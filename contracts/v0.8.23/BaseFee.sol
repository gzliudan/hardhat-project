// SPDX-License-Identifier: MIT

pragma solidity >=0.8.7 <=0.8.23;

/**
 * @title BaseFee
 * @dev A contract demonstrating how to retrieve and handle block base fee
 * @notice Base Fee is part of the dynamic gas fee mechanism introduced in EIP-1559
 * @author Daniel Liu <139250065@qq.com>
 */
contract BaseFee {
    /**
     * @dev Get current block number and base fee
     * @notice Returns basic block information and base fee in Wei
     * @return blockNumber Current block number
     * @return baseFee Current block's base fee (in Wei)
     */
    function getBaseFee() external view returns (uint256 blockNumber, uint256 baseFee) {
        return (block.number, block.basefee);
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
