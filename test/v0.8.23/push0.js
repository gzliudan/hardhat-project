/* global describe, it */

const { expect } = require('chai');
const { ethers } = require('hardhat');

const { deployWithRetry } = require('../utils');

// Constants
const CONTRACT_NAME = 'Push0';

describe(`${CONTRACT_NAME} contract`, function () {
  let contract;

  before(async function () {
    contract = await deployWithRetry(CONTRACT_NAME);
  });

  describe('Test setNum', function () {
    it('should initialize to 0', async function () {
      expect(await contract.num()).to.equal(0);
    });

    it('should set the number correctly', async function () {
      const testNumber = 123;
      const tx = await contract.setNum(testNumber);
      await tx.wait();
      expect(await contract.num()).to.equal(testNumber);
    });

    it('should update the number multiple times', async function () {
      const numbers = [100, 200, 300];
      for (const num of numbers) {
        const tx = await contract.setNum(num);
        await tx.wait();
        expect(await contract.num()).to.equal(num);
      }
    });

    it('should handle large numbers', async function () {
      const largeNumber = ethers.MaxUint256;
      const tx = await contract.setNum(largeNumber);
      await tx.wait();
      expect(await contract.num()).to.equal(largeNumber);
    });
  });
});
