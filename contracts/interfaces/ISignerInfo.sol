// SPDX-License-Identifier: MIT

pragma solidity ^0.8.23;

interface ISignerInfo {
    function setSigner(address _signer) external;
    function getSigner() external returns (address signerAddress);
}
