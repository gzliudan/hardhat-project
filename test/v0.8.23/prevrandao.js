/* global describe, it */

const { expect } = require('chai');
const { ethers } = require('hardhat');

const { deployWithRetry } = require('../utils');

// Constants
const CONTRACT_NAME = 'Prevrandao';

describe(`${CONTRACT_NAME} contract`, function () {
  let contract;

  before(async function () {
    contract = await deployWithRetry(CONTRACT_NAME);
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
