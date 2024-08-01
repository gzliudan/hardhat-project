// SPDX-License-Identifier: MIT

pragma solidity ^0.8.23;

/**
 * @title IPointReward
 * @author Monet
 * @notice Monet RewardPoint contract. Gets created from RewardPointFactory contract's "create()" function
 */
interface IRewardPoint {
    /**
     * @notice Initializes the newly-created RewardPoint contract with the necessary values to create the point ERC-20 token.
     * @param _owner the owner of this contract (a company's address) - from the application that the company submits before onboarding.
     * @param _signerInfo the signer that MONET has in the backend.
     * @param _decimal the decimals of the RewardPoint ERC-20 token - from the application that the company submits before onboarding.
     * @param _pointName the name of the RewardPoint ERC-20 token - from the application that the company submits before onboarding.
     * @param _pointSymbol the symbol of the RewardPoint ERC-20 token - from the application that the company submits before onboarding.
     * @dev gets called automatically once an instance of this contract is deployed.
     *      An instance of RewardPoint contract gets deployed by MONET from the RewardPointFactory contract.
     */
    function initialize(address _owner, address _signerInfo, uint8 _decimal, string calldata _pointName, string calldata _pointSymbol) external;

    /**
     * @notice Users call this function to mint off-chain points into on-chain points
     * @param amount the amount of ponits (ERC-20 tokens) that the "msg.sender" will get after the function call -if applicable-.
     * @param signature a digital signature created by MONET's backend. It embeds information about the minting operation specifics.
     * @dev three types of validation checks will be done by this function before minting:
     *         1. Check whether the signature is created by MONET address or not.
     *         2. Check whether the information that the user is providing (the "points" parameter and the accout that they are using to call this function)
     *            is valid.
     *         3. Check whether the mintingSwitch is ON
     *         Failing at least 1 check will revert the transaction.
     */
    function mint(uint256 amount, bytes memory signature) external;

    /**
     * @notice A company-controlled switch that activates/disactivates off-chain -> on-chain minting option for users.
     * @param _newState the new state of the switch ( on(true) / off(false) )
     * @dev only callable by contract owner (company).
     */
    function setMintingSwitch(bool _newState) external;
}
