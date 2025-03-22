const { expect } = require('chai');
const { ethers } = require('hardhat');

// Constants
const CONTRACT_NAME = 'Prevrandao';

describe(`${CONTRACT_NAME} contract`, function () {
  let contract;

  before(async function () {
    contract = await ethers.deployContract(CONTRACT_NAME);
    await contract.waitForDeployment();
    console.log(`${CONTRACT_NAME} contract address:`, await contract.getAddress());
  });

  describe('Test getPrevrandao', function () {
    it('should return current block number and contract value', async function () {
      const currentBlockNumber = await ethers.provider.getBlockNumber();
      const [number, random] = await contract.getPrevrandao();
      expect(number).to.be.gte(currentBlockNumber);
      expect(random).to.not.equal(0);
      expect(random).to.be.a('bigint');
    });
  });
});
