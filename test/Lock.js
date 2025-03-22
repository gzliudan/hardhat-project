/* global describe, ethers, it */

const { time, loadFixture } = require('@nomicfoundation/hardhat-toolbox/network-helpers');
const { anyValue } = require('@nomicfoundation/hardhat-chai-matchers/withArgs');
const { expect } = require('chai');

describe('Lock contract', function () {
  let lock;
  let unlockTime;
  let lockedAmount;
  let owner;
  let otherAccount;

  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployOneYearLockFixture() {
    const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
    const ONE_GWEI = 1_000_000_000;

    const lockedAmount = ONE_GWEI;
    const unlockTime = (await time.latest()) + ONE_YEAR_IN_SECS;

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const Lock = await ethers.getContractFactory('Lock');
    const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

    return { lock, unlockTime, lockedAmount, owner, otherAccount };
  }

  beforeEach(async function () {
    const fixture = await loadFixture(deployOneYearLockFixture);
    lock = fixture.lock;
    unlockTime = fixture.unlockTime;
    lockedAmount = fixture.lockedAmount;
    owner = fixture.owner;
    otherAccount = fixture.otherAccount;
  });

  describe('Deployment', function () {
    it('Should set the right unlockTime', async function () {
      expect(await lock.unlockTime()).to.equal(unlockTime);
    });

    it('Should set the right owner', async function () {
      expect(await lock.owner()).to.equal(owner.address);
    });

    it('Should receive and store the funds to lock', async function () {
      expect(await ethers.provider.getBalance(lock.target)).to.equal(lockedAmount);
    });

    it('Should fail if the unlockTime is not in the future', async function () {
      // We don't use the fixture here because we want a different deployment
      const latestTime = await time.latest();
      const Lock = await ethers.getContractFactory('Lock');
      await expect(Lock.deploy(latestTime, { value: 1 }))
        .to.be.revertedWithCustomError(Lock, `EarlyTime`)
        .withArgs(latestTime);
    });
  });

  describe('Withdrawals', function () {
    describe('Validations', function () {
      it('Should revert with the right error if called too soon', async function () {
        const newTimestamp = (await time.latest()) + 10;
        await time.setNextBlockTimestamp(newTimestamp);
        await expect(lock.withdraw()).to.be.revertedWithCustomError(lock, `EarlyTime`).withArgs(newTimestamp);
      });

      it('Should revert with the right error if called from another account', async function () {
        // We can increase the time in Hardhat Network
        await time.increaseTo(unlockTime);
        // We use lock.connect() to send a transaction from another account
        await expect(lock.connect(otherAccount).withdraw())
          .to.be.revertedWithCustomError(lock, `NotOwner`)
          .withArgs(otherAccount.address);
      });

      it('Should not fail if the unlockTime has arrived and the owner calls it', async function () {
        // Transactions are sent using the first signer by default
        await time.increaseTo(unlockTime);
        await expect(lock.withdraw()).not.to.be.reverted;
      });
    });

    describe('Events', function () {
      it('Should emit an event on withdrawals', async function () {
        await time.increaseTo(unlockTime);
        await expect(lock.withdraw()).to.emit(lock, 'Withdrawal').withArgs(lockedAmount, anyValue); // We accept any value as `when` arg
      });
    });

    describe('Transfers', function () {
      it('Should transfer the funds to the owner', async function () {
        await time.increaseTo(unlockTime);
        await expect(lock.withdraw()).to.changeEtherBalances([owner, lock], [lockedAmount, -lockedAmount]);
      });
    });
  });
});
