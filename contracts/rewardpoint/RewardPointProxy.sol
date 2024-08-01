// SPDX-License-Identifier: MIT

pragma solidity ^0.8.23;

import { BeaconProxy } from "@openzeppelin/contracts/proxy/beacon/BeaconProxy.sol";

/**
 * @title PayrollProxy
 * @author Yusuf
 * @notice Proxy for Payroll contract
 */
contract RewardPointProxy is BeaconProxy {
    /**
     * @param _beacon Address of deployed Payrol beacon contract
     */
    constructor(address _beacon, bytes memory data) BeaconProxy(_beacon, data) {}

    /**
     * @notice returns the address of the Payrol implementation contract used by the proxy
     */
    function getImplementation() external view returns (address) {
        return _implementation();
    }

    /**
     * @notice returns the address of the beacon contract
     */
    function getBeacon() external view returns (address) {
        return _getBeacon();
    }

    receive() external payable {}
}
