/* global describe, it */

const { expect } = require('chai');
const { ethers } = require('hardhat');

const { deployWithRetry } = require('../utils');

// Constants
const CONTRACT_NAME = 'TestCoin';
const TOKEN_NAME = 'Test Coin';
const TOKEN_SYMBOL = 'TEST';
const INITIAL_SUPPLY = ethers.parseEther('1000000'); // 1,000,000 ether
const MINT_AMOUNT = ethers.parseEther('100');
const BURN_AMOUNT = ethers.parseEther('50');

describe(`${CONTRACT_NAME} contract`, function () {
  let contract;
  let owner;
  let addr1;
  let addr2;
  let chainId;

  before(async function () {
    const signers = await ethers.getSigners();
    owner = signers[0];
    addr1 = owner;
    addr2 = owner;

    contract = await deployWithRetry(CONTRACT_NAME, { args: [TOKEN_NAME, TOKEN_SYMBOL] });
    chainId = await ethers.provider.getNetwork().then((n) => Number(n.chainId));
  });

  describe('Test name', function () {
    it('should return correct name', async function () {
      const name = await contract.name();
      expect(name).to.equal(TOKEN_NAME);
    });
  });

  describe('Test symbol', function () {
    it('should return correct symbol', async function () {
      const symbol = await contract.symbol();
      expect(symbol).to.equal(TOKEN_SYMBOL);
    });
  });

  describe('Test total supply', function () {
    it('should return correct total supply', async function () {
      const totalSupply = await contract.totalSupply();
      expect(totalSupply).to.equal(INITIAL_SUPPLY);
    });
  });

  describe('Test transfer', function () {
    it('should transfer tokens between accounts', async function () {
      const transferAmount = ethers.parseEther('10');
      const initialBalance = await contract.balanceOf(owner.address);
      const tx = await contract.transfer(owner.address, transferAmount);
      await tx.wait();
      const finalBalance = await contract.balanceOf(owner.address);
      expect(finalBalance).to.equal(initialBalance);
    });
  });

  describe('Test mint', function () {
    it('should mint new tokens', async function () {
      const initialBalance = await contract.balanceOf(owner.address);
      const tx = await contract.mint(owner.address, MINT_AMOUNT);
      await tx.wait();
      const finalBalance = await contract.balanceOf(owner.address);
      expect(finalBalance).to.equal(initialBalance + MINT_AMOUNT);
    });
  });

  describe('Test burn', function () {
    it('should mint and burn tokens', async function () {
      let initialBalance = await contract.balanceOf(owner.address);
      let tx = await contract.mint(owner.address, MINT_AMOUNT);
      await tx.wait();
      let balanceAfterMint = await contract.balanceOf(owner.address);
      expect(balanceAfterMint).to.equal(initialBalance + MINT_AMOUNT);

      tx = await contract.burn(BURN_AMOUNT);
      await tx.wait();
      const finalBalance = await contract.balanceOf(owner.address);
      expect(finalBalance).to.equal(balanceAfterMint - BURN_AMOUNT);
    });
  });

  describe('Test permit', function () {
    it('should permit token transfer', async function () {
      const currentBlock = await ethers.provider.getBlock('latest');
      const currentTimestamp = currentBlock.timestamp;
      const deadline = currentTimestamp + 24 * 60 * 60;
      const amount = ethers.parseEther('10');
      const nonce = await contract.nonces(owner.address);

      const domain = {
        name: await contract.name(),
        version: '1',
        chainId: chainId,
        verifyingContract: await contract.getAddress(),
      };

      const types = {
        Permit: [
          { name: 'owner', type: 'address' },
          { name: 'spender', type: 'address' },
          { name: 'value', type: 'uint256' },
          { name: 'nonce', type: 'uint256' },
          { name: 'deadline', type: 'uint256' },
        ],
      };

      const value = {
        owner: owner.address,
        spender: owner.address,
        value: amount,
        nonce: nonce,
        deadline: deadline,
      };

      const signature = await owner.signTypedData(domain, types, value);
      const { v, r, s } = ethers.Signature.from(signature);
      const tx = await contract.permit(owner.address, owner.address, amount, deadline, v, r, s);
      await tx.wait();
      const allowance = await contract.allowance(owner.address, owner.address);
      expect(allowance).to.equal(amount);
    });
  });
});
