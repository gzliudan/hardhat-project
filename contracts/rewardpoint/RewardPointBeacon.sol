// SPDX-License-Identifier: MIT

pragma solidity ^0.8.23;

import { UpgradeableBeacon } from "@openzeppelin/contracts/proxy/beacon/UpgradeableBeacon.sol";

/**
 * @title RewardPointBeacon
 * @notice inherits UpgradeableBeacon. This is the beacon contract for RewardPointProxy
 *
 */
contract RewardPointBeacon is UpgradeableBeacon {
    /**
     * @param _implementation Address of depolyed Payroll contract
     */
    constructor(address _implementation, address _initialOwner) UpgradeableBeacon(_implementation, _initialOwner) {}
}
