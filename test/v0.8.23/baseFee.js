/* global describe, it */

const { expect } = require('chai');
const { ethers } = require('hardhat');

const { deployWithRetry, getChainId, isXdcNetwork } = require('../utils');

// Constants
const CONTRACT_NAME = 'BaseFee';

describe(`${CONTRACT_NAME} contract`, function () {
  let contract;
  let chainId;
  let isXdcNet;

  before(async function () {
    contract = await deployWithRetry(CONTRACT_NAME);
    chainId = await getChainId();
    isXdcNet = isXdcNetwork(chainId);
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
      if (!isXdcNet) {
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
