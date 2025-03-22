const { expect } = require('chai');
const { ethers } = require('hardhat');

// Constants
const CONTRACT_NAME = 'BaseFee';

describe(`${CONTRACT_NAME} contract`, function () {
  let contract;
  let isXDCNetwork;
  let chainId;

  before(async function () {
    contract = await ethers.deployContract(CONTRACT_NAME);
    await contract.waitForDeployment();
    console.log(`${CONTRACT_NAME} contract address:`, await contract.getAddress());
    chainId = await ethers.provider.getNetwork().then((n) => Number(n.chainId));
    isXDCNetwork = [50, 51, 551, 5151].includes(chainId);
    console.log(`Running on ${isXDCNetwork ? 'XDC' : 'non-XDC'} network (chainId: ${chainId})`);
  });

  describe('All networks', function () {
    describe('Test getChainId', function () {
      it('should return correct chain ID', async function () {
        const returnedChainId = await contract.getChainId();
        expect(returnedChainId).to.equal(chainId);
      });
    });

    describe('Test getBaseFee', function () {
      it('should return current block number and base fee', async function () {
        const currentBlockNumber = await ethers.provider.getBlockNumber();
        const [number, returnedBaseFee] = await contract.getBaseFee();
        expect(number).to.be.gte(currentBlockNumber);
        expect(returnedBaseFee).to.be.gte(0);
      });
    });
  });

  describe('XDC network', function () {
    before(function () {
      if (!isXDCNetwork) {
        console.log('Skipping XDC network specific tests on non-XDC network');
        this.skip();
      }
    });

    it('should return expected base fee for XDC networks', async function () {
      const currentBlockNumber = await ethers.provider.getBlockNumber();
      const [number, returnedBaseFee] = await contract.getBaseFee();
      expect(number).to.be.gte(currentBlockNumber);
      const expectedBaseFee = BigInt(12500000000);
      expect(returnedBaseFee).to.equal(expectedBaseFee);
    });
  });
});
