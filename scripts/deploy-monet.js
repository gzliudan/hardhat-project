// SPDX-License-Identifier: MIT

const rewardPointKey = 'reward_point';
const rewardPointBeaconKey = 'reward_point_beacon';
const owner = '0xD4CE02705041F04135f1949Bc835c1Fe0885513c';
const { CHAIN_NAME, CHAIN_ID, deployContract, getDeployedContracts } = require('./helpers');

async function main() {
  // print chain information
  console.log(`\nCHAIN_NAME = ${CHAIN_NAME}, CHAIN_ID = ${CHAIN_ID}\n`);

  await deployContract('RewardPoint', rewardPointKey);

  const { contracts: c1 } = getDeployedContracts(CHAIN_NAME, CHAIN_ID);
  const rewardPointAddress = c1[rewardPointKey]?.address;
  if (!rewardPointAddress) {
    throw new Error(`RewardPoint is not deployed!`);
  }
  await deployContract('RewardPointBeacon', rewardPointBeaconKey, [rewardPointAddress, owner]);

  const { contracts: c2 } = getDeployedContracts(CHAIN_NAME, CHAIN_ID);
  const rewardPointBeaconAddress = c2[rewardPointBeaconKey]?.address;
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
