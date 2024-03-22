// SPDX-License-Identifier: MIT

const fs = require('fs');
const dayjs = require('dayjs');
const hre = require('hardhat');

const DEPLOY_DIR = './deploy';
const CHAIN_NAME = hre.network.name;
const CHAIN_ID = hre.network.config.chainId;

function getDataTime() {
  return dayjs().format('YYYY-MM-DD HH:mm:ss');
}

function getDeployedContracts() {
  const filename = `${DEPLOY_DIR}/${CHAIN_NAME}.json`;

  let contracts;

  try {
    contracts = JSON.parse(fs.readFileSync(filename));
  } catch (e) {
    // console.error(e);
    contracts = {
      chain_name: CHAIN_NAME,
      chain_id: CHAIN_ID,
    };
  }

  return { directory: DEPLOY_DIR, filename, contracts };
}

function writeDeployedContracts(directory, filename, contracts) {
  fs.mkdirSync(directory, { recursive: true });
  fs.writeFileSync(filename, JSON.stringify(contracts, null, 2));
}

/// @param name  The name of contract
/// @param key   The key of contract instance in deployed json file
/// @param args  The arguments of contract constructor function
async function deployContract(name, key, args, options) {
  const { directory, filename, contracts } = getDeployedContracts();
  const oldAddress = contracts[key]?.address;

  if (oldAddress) {
    console.log(`[${getDataTime()}] SKIP: ${key}(${name}) is deployed at ${oldAddress}\n`);
    return oldAddress;
  }

  if (!args) {
    args = [];
  }

  if (!options) {
    options = {};
  }

  // Deploy contract
  console.log(`[${getDataTime()}] DO: Deploy ${key}(${name}) to ${CHAIN_NAME}, args = ${JSON.stringify(args)}`);
  const instance = await hre.ethers.deployContract(name, args, options);
  await instance.waitForDeployment();
  const address = instance.target;
  const hash = instance.deploymentTransaction().hash;
  const trx = await hre.ethers.provider.getTransaction(hash);
  const block = trx.blockNumber;
  const verified = false;
  console.log(`[${getDataTime()}] OK: ${key}(${name}) is deployed at ${address} , block = ${block} , hash = ${hash}`);

  // update addresses
  contracts[key] = { name, args, address, block, hash, verified };
  writeDeployedContracts(directory, filename, contracts);
  console.log(`[${getDataTime()}] OK: Write ${key} to file ${filename}\n`);

  return instance;
}

async function verifyContract(key, args) {
  const { directory, filename, contracts } = getDeployedContracts(CHAIN_NAME, CHAIN_ID);
  const { address, name, verified } = contracts[key];

  if (!address) {
    throw new Error(`[${getDataTime()}] FAIL: must set ${key} in file ${filename} !`);
  }

  if (verified) {
    console.log(`[${getDataTime()}] SKIP: ${key}(${name}) at ${address} has been verified\n`);
    return;
  }

  if (!args) {
    args = contracts[key].args;
  }

  if (!args) {
    args = [];
  }

  console.log(`[${getDataTime()}] DO: verify ${key}(${name}) at ${address}, args = ${JSON.stringify(args)}`);

  try {
    await hre.run('verify:verify', {
      network: CHAIN_NAME,
      address,
      constructorArguments: args,
    });

    contracts[key].verified = true;
    writeDeployedContracts(directory, filename, contracts);
    console.log(`[${getDataTime()}] OK: verify ${key}(${name}) at ${address}\n`);
  } catch (e) {
    console.error(e);
    console.log(`[${getDataTime()}] FAIL: verify ${key}(${name}) at ${address}\n`);
  }
}

module.exports = {
  CHAIN_NAME,
  CHAIN_ID,
  deployContract,
  getDataTime,
  getDeployedContracts,
  writeDeployedContracts,
  verifyContract,
};
