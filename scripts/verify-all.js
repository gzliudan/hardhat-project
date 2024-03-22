// SPDX-License-Identifier: MIT

const { CHAIN_NAME, CHAIN_ID, verifyContract } = require('./helpers');

// verify all contracts
async function main() {
  // print chain information
  console.log(`\nCHAIN_NAME = ${CHAIN_NAME}, CHAIN_ID = ${CHAIN_ID}\n`);

  await verifyContract('lock');
  await verifyContract('mh_token');
  await verifyContract('test_coin');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
