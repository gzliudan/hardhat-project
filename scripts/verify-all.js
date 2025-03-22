// SPDX-License-Identifier: MIT

const { CHAIN_NAME, CHAIN_ID, verifyContract } = require('./helpers');

// verify all contracts
async function main() {
  // print chain information
  console.log(`\nCHAIN_NAME = ${CHAIN_NAME}, CHAIN_ID = ${CHAIN_ID}\n`);

  await verifyContract('lock');
  await verifyContract('mh_token');
  await verifyContract('test_coin');
  await deployContract('base_fee');
  await deployContract('prevrandao');
  await deployContract('push0');
  await deployContract('blob_base_fee');
  await deployContract('custom_error');
  await deployContract('mcopy');
  await deployContract('transient_storage');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
