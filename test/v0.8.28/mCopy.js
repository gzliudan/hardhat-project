/* global describe, it */

const { expect } = require('chai');
const { ethers } = require('hardhat');

const { deployWithRetry } = require('../utils');

// Constants
const CONTRACT_NAME = 'MCopy';
const ZERO_WORD = '0x0000000000000000000000000000000000000000000000000000000000000000';
const MAX_WORD = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';
const TEST_WORD = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef';
const TEST_BYTE_ARRAY = '0x1234567890abcdef';
const TEST_LONG_BYTE_ARRAY = '0x' + '1234567890abcdef'.repeat(100);
const TEST_WORD_ARRAY = '0x1234567890abcdef1234567890abcdef';

describe(`${CONTRACT_NAME} contract`, function () {
  let contract;

  before(async function () {
    contract = await deployWithRetry(CONTRACT_NAME);
  });

  describe('Test copyWord', function () {
    it('Should copy a word correctly', async function () {
      const result = await contract.copyWord(TEST_WORD);
      expect(result).to.equal(TEST_WORD);
    });

    it('Should copy zero word correctly', async function () {
      const result = await contract.copyWord(ZERO_WORD);
      expect(result).to.equal(ZERO_WORD);
    });

    it('Should copy max word correctly', async function () {
      const result = await contract.copyWord(MAX_WORD);
      expect(result).to.equal(MAX_WORD);
    });
  });

  describe('Test copyByteArray', function () {
    it('Should copy a byte array correctly', async function () {
      const result = await contract.copyByteArray(TEST_BYTE_ARRAY);
      expect(result).to.equal(TEST_BYTE_ARRAY);
    });

    it('Should copy empty array correctly', async function () {
      const source = '0x';
      await expect(contract.copyByteArray(source)).to.be.revertedWith('Source array cannot be empty');
    });

    it('Should copy long byte array correctly', async function () {
      const result = await contract.copyByteArray(TEST_LONG_BYTE_ARRAY);
      expect(result).to.equal(TEST_LONG_BYTE_ARRAY);
    });
  });

  describe('Test copyMultipleWord', function () {
    it('Should copy multiple words correctly', async function () {
      const count = 3;
      const result = await contract.copyMultipleWord(TEST_WORD, count);

      expect(result).to.be.an('array');
      expect(result).to.have.lengthOf(count);
      result.forEach((word) => {
        expect(word).to.equal(TEST_WORD);
      });
    });

    it('Should copy zero words correctly', async function () {
      const count = 0;
      const result = await contract.copyMultipleWord(TEST_WORD, count);

      expect(result).to.be.an('array');
      expect(result).to.have.lengthOf(0);
    });

    it('Should copy multiple zero words correctly', async function () {
      const count = 3;
      const result = await contract.copyMultipleWord(ZERO_WORD, count);

      expect(result).to.be.an('array');
      expect(result).to.have.lengthOf(count);
      result.forEach((word) => {
        expect(word).to.equal(ZERO_WORD);
      });
    });
  });

  describe('Test copyWithOffset', function () {
    it('Should copy with offset correctly', async function () {
      const offset = 2;
      const length = 4;
      const result = await contract.copyWithOffset(TEST_WORD_ARRAY, offset, length);

      // 从 source 中提取指定偏移量和长度的部分
      const expected = '0x' + TEST_WORD_ARRAY.slice(2 + offset * 2, 2 + (offset + length) * 2);
      expect(result).to.equal(expected);
    });

    it('Should copy from start correctly', async function () {
      const offset = 0;
      const length = 8;
      const result = await contract.copyWithOffset(TEST_WORD_ARRAY, offset, length);

      // 从开始位置复制指定长度
      const expected = '0x' + TEST_WORD_ARRAY.slice(2, 2 + length * 2);
      expect(result).to.equal(expected);
    });

    it('Should copy to end correctly', async function () {
      const offset = 8;
      const length = 8;
      const result = await contract.copyWithOffset(TEST_WORD_ARRAY, offset, length);

      // 从指定偏移量复制到结束
      const expected = '0x' + TEST_WORD_ARRAY.slice(2 + offset * 2);
      expect(result).to.equal(expected);
    });

    it('Should revert when offset + length exceeds source length', async function () {
      const offset = 8;
      const length = 2;
      await expect(contract.copyWithOffset(TEST_BYTE_ARRAY, offset, length)).to.be.revertedWith(
        'Invalid offset or length'
      );
    });
  });
});
