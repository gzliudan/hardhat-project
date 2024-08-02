// SPDX-License-Identifier: MIT

const { CHAIN_NAME, CHAIN_ID, RPC, deployContract, etherToWei } = require('./helpers');

// deploy all contracts
async function main() {
  // print chain information
  console.log(`\nCHAIN_NAME = ${CHAIN_NAME}, CHAIN_ID = ${CHAIN_ID}, RPC = ${RPC}\n`);

  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = currentTimestampInSeconds + 60;
  const value = etherToWei('0.001');

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
