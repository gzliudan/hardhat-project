// SPDX-License-Identifier: MIT

pragma solidity ^0.8.23;

import "@openzeppelin/contracts/access/Ownable.sol";

import "./RewardPointProxy.sol";
import "./RewardPoint.sol";
import "../interfaces/ISignerInfo.sol";

contract RewardPointFactory is ISignerInfo, Ownable {
    error RewardPointFactory__NotContractAddress();
    error RewardPointFactory__ZeroAddress();

    address private _beacon;
    address public signer; //the address that will be used by the backend to sign messages
    address[] public rewardPoints; //An array to keep track of factory created points
    mapping(address => address[]) rewardPointsOf; //Links each company's address with its point's contract address

    event Create(address indexed owner, address pointAddress, string name, string symbol);
    event SetSigner(address newSigner);

    constructor(address i_beacon, address _signer) Ownable(msg.sender) {
        if (i_beacon == address(0)) {
            revert RewardPointFactory__ZeroAddress();
        }
        _beacon = i_beacon;
        signer = _signer;
    }

    function create(address _owner, uint8 _decimals, string memory _name, string memory _symbol) external onlyOwner returns (address) {
        address _rewardPointProxy = _create(_owner, _decimals, _name, _symbol);

        emit Create(_owner, _rewardPointProxy, _name, _symbol);

        return _rewardPointProxy;
    }

    function getRewardPoints() public view returns (address[] memory) {
        return rewardPoints;
    }

    function getRewardPointsOf(address account) external view returns (address[] memory) {
        return rewardPointsOf[account];
    }

    function _create(address _owner, uint8 _decimal, string memory _name, string memory _symbol) private returns (address) {
        address _proxy = address(new RewardPointProxy(_beacon, abi.encodeCall(RewardPoint.initialize, (_owner, address(this), _decimal, _name, _symbol))));
        rewardPointsOf[_owner].push(_proxy);
        rewardPoints.push(_proxy);
        return _proxy;
    }

    //change the signer of MONET if needed.
    //This function is called every time someone is trying to mint their points in any instance contract (point contract)
    function setSigner(address _signer) external onlyOwner {
        signer = _signer;
        emit SetSigner(_signer);
    }

    function getSigner() external view returns (address) {
        return signer;
    }
}
