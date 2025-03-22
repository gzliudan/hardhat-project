/* global describe, it */

const { expect } = require('chai');
const { ethers } = require('hardhat');

const { deployWithRetry } = require('../utils');

// Constants
const CONTRACT_NAME = 'TransientStorage';

describe(`${CONTRACT_NAME} contract`, function () {
  let contract;

  before(async function () {
    contract = await deployWithRetry(CONTRACT_NAME);
  });

  describe('Test readAndWrite', function () {
    it('should write and read value from transient storage', async function () {
      const value = ethers.parseEther('3');
      const result = await contract.readAndWrite.staticCall(value);
      expect(result).to.equal(value);
    });
  });

  describe('Test swapSlots', function () {
    it('should swap values between slots', async function () {
      const value1 = ethers.parseEther('5');
      const value2 = ethers.parseEther('7');
      const result = await contract.swapSlots.staticCall(value1, value2);
      expect(result[0]).to.equal(value2);
      expect(result[1]).to.equal(value1);
    });
  });

  describe('Test addSlots', function () {
    it('should add values and store the result', async function () {
      const value1 = ethers.parseEther('1');
      const value2 = ethers.parseEther('2');
      const expectedSum = value1 + value2;
      const result = await contract.addSlots.staticCall(value1, value2);
      expect(result).to.equal(expectedSum);
    });
  });
});
