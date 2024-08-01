// SPDX-License-Identifier: MIT

const rewardPointKey = 'reward_point';
const rewardPointBeaconKey = 'reward_point_beacon';
const owner = '0xD4CE02705041F04135f1949Bc835c1Fe0885513c';
const { CHAIN_NAME, CHAIN_ID, deployContract, getContractAddressByKey } = require('./helpers');

async function main() {
  // print chain information
  console.log(`\nCHAIN_NAME = ${CHAIN_NAME}, CHAIN_ID = ${CHAIN_ID}\n`);

  await deployContract('RewardPoint', rewardPointKey);

  const rewardPointAddress = getContractAddressByKey(rewardPointKey);
  if (!rewardPointAddress) {
    throw new Error(`RewardPoint is not deployed!`);
  }
  await deployContract('RewardPointBeacon', rewardPointBeaconKey, [rewardPointAddress, owner]);

  const rewardPointBeaconAddress = getContractAddressByKey(rewardPointBeaconKey);
  if (!rewardPointBeaconAddress) {
    throw new Error(`RewardPointBeacon is not deployed!`);
  }
  await deployContract('RewardPointFactory', 'reward_point_factory', [rewardPointBeaconAddress, owner]);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
