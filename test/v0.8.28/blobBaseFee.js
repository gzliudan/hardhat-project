/* global describe, it */

const { expect } = require('chai');
const { ethers } = require('hardhat');

const { deployWithRetry, getChainId, isXdcNetwork } = require('../utils');

// Constants
const CONTRACT_NAME = 'BlobBaseFee';
const ZERO_HASH = '0x0000000000000000000000000000000000000000000000000000000000000000';
const MAX_UINT256 = BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff');

describe(`${CONTRACT_NAME} contract`, function () {
  let contract;
  let chainId;
  let isXdcNet;

  before(async function () {
    contract = await deployWithRetry(CONTRACT_NAME);
    chainId = await getChainId();
    isXdcNet = isXdcNetwork(chainId);
  });

  describe('All Networks', function () {
    describe('Test getChainId', function () {
      it('should return correct chain ID', async function () {
        const returnedChainId = await contract.getChainId();
        expect(returnedChainId).to.equal(chainId);
      });
    });

    describe('Test getBlobBaseFee', function () {
      it('Should return valid blob base fee', async function () {
        const baseFee = await contract.getBlobBaseFee();
        expect(baseFee).to.be.a('bigint');
      });
    });

    describe('Test getBlobHashByIndex', function () {
      it('Should return valid blob hash for index 0', async function () {
        const hash = await contract.getBlobHashByIndex(0);
        expect(hash).to.be.a('string');
        expect(hash).to.have.lengthOf(66);
      });

      it('Should return valid blob hash for random index', async function () {
        const randomIndex = Math.floor(Math.random() * 1000);
        const hash = await contract.getBlobHashByIndex(randomIndex);
        expect(hash).to.be.a('string');
        expect(hash).to.have.lengthOf(66);
      });

      it('Should return valid blob hash for max index', async function () {
        const hash = await contract.getBlobHashByIndex(MAX_UINT256);
        expect(hash).to.be.a('string');
        expect(hash).to.have.lengthOf(66);
      });
    });

    describe('Test getMultipleBlobHashes', function () {
      it('Should return valid multiple blob hashes starting from index 0', async function () {
        const startIndex = 0;
        const count = 3;
        const hashes = await contract.getMultipleBlobHashes(startIndex, count);

        expect(hashes).to.be.an('array');
        expect(hashes).to.have.lengthOf(count);
        hashes.forEach((hash) => {
          expect(hash).to.be.a('string');
          expect(hash).to.have.lengthOf(66);
        });
      });

      it('Should return valid multiple blob hashes starting from non-zero index', async function () {
        const startIndex = 5;
        const count = 3;
        const hashes = await contract.getMultipleBlobHashes(startIndex, count);

        expect(hashes).to.be.an('array');
        expect(hashes).to.have.lengthOf(count);
        hashes.forEach((hash) => {
          expect(hash).to.be.a('string');
          expect(hash).to.have.lengthOf(66);
        });
      });

      it('Should handle zero count in getMultipleBlobHashes', async function () {
        const hashes = await contract.getMultipleBlobHashes(0, 0);
        expect(hashes).to.be.an('array');
        expect(hashes).to.have.lengthOf(0);
      });
    });
  });

  describe('XDC Network', function () {
    before(function () {
      if (!isXdcNet) {
        console.log('Skipping XDC network specific tests on non-XDC network');
        this.skip();
      }
    });

    describe('Test getBlobBaseFee', function () {
      it('Should return 0 for blob base fee', async function () {
        const baseFee = await contract.getBlobBaseFee();
        expect(baseFee).to.equal(0);
      });
    });

    describe('Test getBlobHashByIndex', function () {
      it('Should return 0 for blob hash with index 0', async function () {
        const hash = await contract.getBlobHashByIndex(0);
        expect(hash).to.equal(ZERO_HASH);
      });

      it('Should return 0 for blob hash with random index', async function () {
        const randomIndex = Math.floor(Math.random() * 1000);
        const hash = await contract.getBlobHashByIndex(randomIndex);
        expect(hash).to.equal(ZERO_HASH);
      });

      it('Should return 0 for blob hash with max index', async function () {
        const hash = await contract.getBlobHashByIndex(MAX_UINT256);
        expect(hash).to.equal(ZERO_HASH);
      });
    });

    describe('Test getMultipleBlobHashes', function () {
      it('Should return array of zeros starting from index 0', async function () {
        const startIndex = 0;
        const count = 3;
        const hashes = await contract.getMultipleBlobHashes(startIndex, count);

        expect(hashes).to.be.an('array');
        expect(hashes).to.have.lengthOf(count);
        hashes.forEach((hash) => {
          expect(hash).to.equal(ZERO_HASH);
        });
      });

      it('Should return array of zeros starting from non-zero index', async function () {
        const startIndex = 5;
        const count = 3;
        const hashes = await contract.getMultipleBlobHashes(startIndex, count);

        expect(hashes).to.be.an('array');
        expect(hashes).to.have.lengthOf(count);
        hashes.forEach((hash) => {
          expect(hash).to.equal(ZERO_HASH);
        });
      });
    });
  });
});
