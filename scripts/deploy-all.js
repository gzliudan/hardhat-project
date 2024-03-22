// SPDX-License-Identifier: MIT

// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require('hardhat');

const { CHAIN_NAME, CHAIN_ID, deployContract } = require('./helpers');

// deploy all contracts
async function main() {
  // print chain information
  console.log(`\nCHAIN_NAME = ${CHAIN_NAME}, CHAIN_ID = ${CHAIN_ID}\n`);

  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = currentTimestampInSeconds + 60;
  const value = hre.ethers.parseEther('0.001');

  await deployContract('Lock', 'lock', [unlockTime], { value });
  await deployContract('MhToken', 'mh_token');
  await deployContract('TestCoin', 'test_coin', ['Test Coin', 'TCT']);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
