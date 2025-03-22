// SPDX-License-Identifier: MIT

const { CHAIN_NAME, CHAIN_ID, verifyContract } = require('./helpers');

// verify all contracts
async function main() {
  // print chain information
  console.log(`\nCHAIN_NAME = ${CHAIN_NAME}, CHAIN_ID = ${CHAIN_ID}\n`);

  await verifyContract('lock');
  await verifyContract('mh_token');
  await verifyContract('test_coin');
  await verifyContract('base_fee');
  await verifyContract('prevrandao');
  await verifyContract('push0');
  await verifyContract('blob_base_fee');
  await verifyContract('custom_error');
  await verifyContract('mcopy');
  await verifyContract('transient_storage');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
