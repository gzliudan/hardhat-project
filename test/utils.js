// SPDX-License-Identifier: MIT

const { ethers } = require('hardhat');

const RetryTimes = 5;
const WaitSeconds = 2;

/**
 * Sleep for specified number of seconds
 * @param {number} interval_s - Time to sleep in seconds
 * @returns {Promise<void>} A promise that resolves after the specified time
 */
function sleep(interval_s) {
  return sleep_ms(interval_s * 1000);
}

/**
 * Sleep for specified number of milliseconds
 * @param {number} interval_ms - Time to sleep in milliseconds
 * @returns {Promise<void>} A promise that resolves after the specified time
 */
function sleep_ms(interval_ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, interval_ms);
  });
}

/**
 * Deploy a contract with retry mechanism
 * @param {string} contractName - Name of the contract to deploy
 * @param {Object} [options] - Deployment options
 * @param {Array} [options.args=[]] - Constructor arguments for the contract
 * @param {number} [options.delay=WaitSeconds] - Delay between retries in seconds
 * @param {number} [options.maxAttempts=RetryTimes] - Maximum number of deployment attempts
 * @param {Function} [options.deployFn] - Custom deployment function, must return contract instance
 * @returns {Promise<*>} The result of the deployment function
 */
async function deployWithRetry(contractName, options = {}) {
  const {
    args = [],
    delay = WaitSeconds,
    maxAttempts = RetryTimes,
    deployFn = async () => {
      const contract = await ethers.deployContract(contractName, args);
      await contract.waitForDeployment();
      return contract;
    },
  } = options;

  for (let i = 1; i <= maxAttempts; i++) {
    try {
      console.log(`Deploy contract ${contractName} ...`);
      const contract = await deployFn();
      console.log(`Deploy contract ${contractName} OK, times=${i}, address:`, await contract.getAddress());
      return contract;
    } catch (error) {
      console.log(`Fail to deploy contract ${contractName}, times=${i}, error:`, error.message);
      if (i >= maxAttempts) throw error;
      console.log(`Retry after ${delay / 1000} seconds`);
      await sleep(delay);
    }
  }
}

/**
 * Get the current chain ID with retry mechanism
 * @returns {Promise<number>} The chain ID of the current network
 */
async function getChainId() {
  for (let i = 1; i <= RetryTimes; i++) {
    try {
      return await ethers.provider.getNetwork().then((n) => Number(n.chainId));
    } catch (error) {
      console.log(`Fail to getChainId, times=${i}, error:`, error.message);
      if (i >= RetryTimes) throw error;
      console.log(`Retry after ${delay / 1000} seconds`);
      await sleep(1);
    }
  }
}

/**
 * Check if the current network is an XDC network
 * @param {number} chainId - The chain ID to check
 * @returns {boolean} True if the network is an XDC network (chainId: 50, 51, 551, 5151)
 */
function isXdcNetwork(chainId) {
  const isXdc = [50, 51, 551, 5151].includes(chainId);
  console.log(`Running on ${isXdc ? 'XDC' : 'non-XDC'} network, chainId=${chainId}`);
  return isXdc;
}

module.exports = {
  deployWithRetry,
  getChainId,
  isXdcNetwork,
  sleep,
};
