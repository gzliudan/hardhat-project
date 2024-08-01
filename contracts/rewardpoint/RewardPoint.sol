// SPDX-License-Identifier: MIT

pragma solidity ^0.8.23;

import { ERC20Upgradeable as ERC20 } from "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import { Initializable } from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "./SignatureVerifier.sol";
import "../interfaces/ISignerInfo.sol";
import "../interfaces/IRewardPoint.sol";

contract RewardPoint is IRewardPoint, Initializable, ERC20, SignatureVerifier {
    address public owner;
    uint8 decimal; //decimals of this exact point
    bool public mintingSwitch = true; //minting stops when this variable is false. Company function (onlyOwner)

    mapping(address => uint256) public convertedPoints; //keeps track of the user's already converted points. Helps in calculating the amount of points this user must get.

    ISignerInfo public signerInfo; //address of the pointFactory contract

    event Mint(address user, uint256 value);
    event SetMintingSwitch(bool newState);

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    /// @inheritdoc IRewardPoint
    function initialize(address _owner, address _signerAccount, uint8 _decimal, string memory _pointName, string memory _pointSymbol) external initializer {
        require(_owner != address(0), "0x0_owner");
        require(_signerAccount != address(0), "0x0_signerAccount");
        __ERC20_init(_pointName, _pointSymbol);
        owner = _owner;
        decimal = _decimal;
        signerInfo = ISignerInfo(_signerAccount);
        mintingSwitch = true;
    }

    //sets the decimals of the point token
    function decimals() public view override returns (uint8) {
        return decimal;
    }

    //this function allow users to mint their off-chain points into on-chain points.
    //From the UI, the user will pay for the gas fee of calling this function, the calculation of points will happen,
    // then these points will get transferred to the user.
    //If a user tries to call this funciton on their own, they will not be able to create the right signature -that has been reated by MONET account-
    // so their transaction will get reverted.
    //The signed message contains information about the user address, te amount of points they are minting,
    // and a nonce to maintain the uniqueness of the signatures

    /// @inheritdoc IRewardPoint
    function mint(uint256 amount, bytes memory signature) external {
        //re-creating the message that MONET signed
        bytes32 messageHash = getMessageHash(msg.sender, amount, nonces[msg.sender], address(this));
        bytes32 ethSignedMessageHash = getEthSignedMessageHash(messageHash);

        //checks
        if (usedSignatures[signature]) {
            revert UsedSignature(msg.sender, signature);
        }

        if (recover(ethSignedMessageHash, signature) != signerInfo.getSigner()) {
            revert InvalidSignature(msg.sender, signature);
        }

        if (mintingSwitch == false) {
            revert MintingHasStopped();
        }

        //actions
        //1. increase the user's nonce
        nonces[msg.sender]++;
        //2. setting this signature as used
        usedSignatures[signature] = true;
        //3. minting the points to the user address
        _mint(msg.sender, amount);
        //4. update the alreadyConvertedPoints value
        convertedPoints[msg.sender] += amount;
        // 5. emitting an event to the UI
        emit Mint(msg.sender, amount);
    }

    /// @inheritdoc IRewardPoint
    function setMintingSwitch(bool _newState) external onlyOwner {
        mintingSwitch = _newState;
        emit SetMintingSwitch(_newState);
    }
}
