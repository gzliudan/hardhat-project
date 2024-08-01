// SPDX-License-Identifier: MIT

pragma solidity ^0.8.23;

contract SignatureVerifier {
    mapping(address => uint256) public nonces; //keeps track of the nonce of each user
    mapping(bytes => bool) public usedSignatures; //keeps track of used signatures, so they are not used again

    error UsedSignature(address user, bytes signature);
    error InvalidSignature(address user, bytes signature);
    error MintingHasStopped();

    //Signature related funcitons
    function getMessageHash(address _user, uint256 _points, uint256 _nonce, address _pointContract) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(_user, _points, _nonce, _pointContract));
    }

    function getEthSignedMessageHash(bytes32 _messageHash) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", _messageHash));
    }

    function recover(bytes32 _ethSignedMessageHash, bytes memory _sig) internal pure returns (address) {
        (bytes32 r, bytes32 s, uint8 v) = _split(_sig);
        return ecrecover(_ethSignedMessageHash, v, r, s);
    }

    function _split(bytes memory _sig) internal pure returns (bytes32 r, bytes32 s, uint8 v) {
        require(_sig.length == 65, "invalid signature length");

        assembly {
            r := mload(add(_sig, 32))
            s := mload(add(_sig, 64))
            v := byte(0, mload(add(_sig, 96)))
        }
    }
}
