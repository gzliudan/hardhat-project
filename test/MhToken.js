/* global describe, ethers, it */

const { expect } = require('chai');
const { loadFixture } = require('@nomicfoundation/hardhat-toolbox/network-helpers');

describe('MhToken contract', function () {
  let mhToken;
  let owner;
  let addr1;
  let addr2;

  async function deployTokenFixture() {
    const [owner, addr1, addr2] = await ethers.getSigners();
    const mhToken = await ethers.deployContract('MhToken');
    await mhToken.waitForDeployment();
    return { mhToken, owner, addr1, addr2 };
  }

  beforeEach(async function () {
    const fixture = await loadFixture(deployTokenFixture);
    mhToken = fixture.mhToken;
    owner = fixture.owner;
    addr1 = fixture.addr1;
    addr2 = fixture.addr2;
  });

  describe('Deployment', function () {
    it('Should set the right owner', async function () {
      expect(await mhToken.owner()).to.equal(owner.address);
    });

    it('Should assign the total supply of tokens to the owner', async function () {
      const ownerBalance = await mhToken.balanceOf(owner.address);
      expect(await mhToken.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe('Transactions', function () {
    it('Should transfer tokens between accounts', async function () {
      await expect(mhToken.transfer(addr1.address, 50)).to.changeTokenBalances(mhToken, [owner, addr1], [-50, 50]);
      await expect(mhToken.connect(addr1).transfer(addr2.address, 50)).to.changeTokenBalances(
        mhToken,
        [addr1, addr2],
        [-50, 50]
      );
    });

    it('Should emit Transfer events', async function () {
      await expect(mhToken.transfer(addr1.address, 50))
        .to.emit(mhToken, 'Transfer')
        .withArgs(owner.address, addr1.address, 50);
      await expect(mhToken.connect(addr1).transfer(addr2.address, 50))
        .to.emit(mhToken, 'Transfer')
        .withArgs(addr1.address, addr2.address, 50);
    });

    it("Should fail if sender doesn't have enough tokens", async function () {
      const initialOwnerBalance = await mhToken.balanceOf(owner.address);
      await expect(mhToken.connect(addr1).transfer(owner.address, 1)).to.be.revertedWithCustomError(
        mhToken,
        `InsufficientToken`
      );
      expect(await mhToken.balanceOf(owner.address)).to.equal(initialOwnerBalance);
    });
  });
});
