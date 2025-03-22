/* global describe, it */

const { expect } = require('chai');
const { ethers } = require('hardhat');

const { deployWithRetry } = require('../utils');

// Constants
const CONTRACT_NAME = 'CustomError';
const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
const TEST_ADDRESS = '0x1234567890123456789012345678901234567890';

describe(`${CONTRACT_NAME} contract`, function () {
  let contract;
  let owner;

  before(async function () {
    [owner] = await ethers.getSigners();
    contract = await deployWithRetry(CONTRACT_NAME);
  });

  describe('Test withdraw', function () {
    it('Should pass when amount is valid', async function () {
      await expect(contract.withdraw(100)).to.not.be.reverted;
    });

    it('Should revert with InvalidAmount error when amount is 0', async function () {
      await expect(contract.withdraw(0)).to.be.revertedWithCustomError(contract, 'InvalidAmount').withArgs(0);
    });

    it('Should revert with InsufficientBalance error when amount exceeds balance', async function () {
      await expect(contract.withdraw(2000))
        .to.be.revertedWithCustomError(contract, 'InsufficientBalance')
        .withArgs(2000, 1000);
    });
  });

  describe('Test setOwner', function () {
    it('Should pass when new owner is valid', async function () {
      await expect(contract.setOwner(TEST_ADDRESS)).to.not.be.reverted;
    });

    it('Should revert with InvalidAddress error when new owner is zero address', async function () {
      await expect(contract.setOwner(ZERO_ADDRESS))
        .to.be.revertedWithCustomError(contract, 'InvalidAddress')
        .withArgs(ZERO_ADDRESS);
    });

    it('Should revert with InvalidAddress error when new owner is current owner', async function () {
      await expect(contract.setOwner(owner.address))
        .to.be.revertedWithCustomError(contract, 'InvalidAddress')
        .withArgs(owner.address);
    });
  });

  describe('Test updateNumbers', function () {
    it('Should pass when array length matches', async function () {
      const newNumbers = [1, 2, 3, 4, 5];
      await expect(contract.updateNumbers(newNumbers)).to.not.be.reverted;
    });

    it('Should revert with ArrayLengthMismatch error when array length does not match', async function () {
      const newNumbers = [1, 2, 3];
      await expect(contract.updateNumbers(newNumbers))
        .to.be.revertedWithCustomError(contract, 'ArrayLengthMismatch')
        .withArgs(5, 3);
    });
  });

  describe('Test complexOperation', function () {
    it('Should pass when all parameters are valid', async function () {
      await expect(contract.complexOperation(100, TEST_ADDRESS)).to.not.be.reverted;
    });

    it('Should revert with InvalidAmount error when amount is 0', async function () {
      await expect(contract.complexOperation(0, TEST_ADDRESS))
        .to.be.revertedWithCustomError(contract, 'InvalidAmount')
        .withArgs(0);
    });

    it('Should revert with InsufficientBalance error when amount exceeds balance', async function () {
      await expect(contract.complexOperation(2000, TEST_ADDRESS))
        .to.be.revertedWithCustomError(contract, 'InsufficientBalance')
        .withArgs(2000, 1000);
    });

    it('Should revert with InvalidAddress error when target is zero address', async function () {
      await expect(contract.complexOperation(100, ZERO_ADDRESS))
        .to.be.revertedWithCustomError(contract, 'InvalidAddress')
        .withArgs(ZERO_ADDRESS);
    });
  });
});
