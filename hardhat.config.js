require('@nomicfoundation/hardhat-chai-matchers');
require('@nomicfoundation/hardhat-toolbox');
require('@nomicfoundation/hardhat-verify');

require('dotenv').config();

const ether = (n) => `${n}${'0'.repeat(18)}`;

const {
  LOCAL_RPC,
  DEV_RPC,
  DEVNET_RPC,
  APOTHEM_RPC,
  XINFIN_RPC,
  AMOY_RPC,
  MUMBAI_RPC,
  POLYGON_RPC,
  GOERLI_RPC,
  SEPOLIA_RPC,
  MAINNET_RPC,

  ETHERSCAN_API_KEY,
  INFURA_API_KEY,
  POLYGONSCAN_API_KEY,
  XDC_API_KEY,
} = process.env;

const LOCAL_RPC_URL = LOCAL_RPC || 'http://localhost:8545';
const DEV_RPC_URL = DEV_RPC || 'http://localhost:8545';
const DEVNET_RPC_URL = DEVNET_RPC || 'https://devnetstats.hashlabs.apothem.network/devnet';
const APOTHEM_RPC_URL = APOTHEM_RPC || 'https://erpc.apothem.network';
const XINFIN_RPC_URL = XINFIN_RPC || 'https://earpc.xinfin.network';
const MUMBAI_RPC_URL = MUMBAI_RPC || 'https://rpc.ankr.com/polygon_mumbai';
const AMOY_RPC_URL = AMOY_RPC || 'https://rpc-amoy.polygon.technology';
const POLYGON_RPC_URL = POLYGON_RPC || 'https://rpc.ankr.com/polygon';
const GOERLI_RPC_URL = GOERLI_RPC || `https://goerli.infura.io/v3/${INFURA_API_KEY}`;
const SEPOLIA_RPC_URL = SEPOLIA_RPC || 'https://rpc.sepolia.org';
const MAINNET_RPC_URL = MAINNET_RPC || `https://mainnet.infura.io/v3/${INFURA_API_KEY}`;

function getPrivateKey() {
  const { DEPLOYER_PRIVATE_KEY } = process.env;

  if (!DEPLOYER_PRIVATE_KEY) {
    throw new Error('DEPLOYER_PRIVATE_KEY must be set in file .env !');
  }

  const length = DEPLOYER_PRIVATE_KEY.length;

  if (length == 66) {
    if (DEPLOYER_PRIVATE_KEY.slice(0, 2).toLowerCase() != '0x') {
      throw new Error(`DEPLOYER_PRIVATE_KEY must start with 0x !}`);
    }
    return `0x${DEPLOYER_PRIVATE_KEY.slice(2)}`;
  }

  if (length == 64) {
    return `0x${DEPLOYER_PRIVATE_KEY}`;
  }

  throw new Error(`DEPLOYER_PRIVATE_KEY must be 66 characters and start with 0x !}`);
}

const DEPLOYER_ACCOUNT = getPrivateKey();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      allowUnlimitedContractSize: false,
      accounts: {
        count: 10,
        accountsBalance: ether(10000),
      },
      blockGasLimit: 30_000_000,
      chainId: 31337,
      coinbase: '0xc014ba5ec014ba5ec014ba5ec014ba5ec014ba5e',
      hardfork: 'cancun',
      gas: 30_000_000,
      gasPrice: 'auto',
      loggingEnabled: false,
    },
    local: {
      accounts: [DEPLOYER_ACCOUNT],
      url: LOCAL_RPC_URL,
    },
    dev: {
      accounts: [DEPLOYER_ACCOUNT],
      url: DEV_RPC_URL,
    },
    xdcdev: {
      accounts: [DEPLOYER_ACCOUNT],
      chainId: 551,
      timeout: 180_000,
      url: DEVNET_RPC_URL,
    },
    apothem: {
      accounts: [DEPLOYER_ACCOUNT],
      chainId: 51,
      timeout: 180_000,
      url: APOTHEM_RPC_URL,
    },
    xinfin: {
      accounts: [DEPLOYER_ACCOUNT],
      chainId: 50,
      timeout: 180_000,
      url: XINFIN_RPC_URL,
    },
    mumbai: {
      accounts: [DEPLOYER_ACCOUNT],
      chainId: 80001,
      url: MUMBAI_RPC_URL,
    },
    amoy: {
      accounts: [DEPLOYER_ACCOUNT],
      chainId: 80002,
      url: AMOY_RPC_URL,
    },
    polygon: {
      accounts: [DEPLOYER_ACCOUNT],
      chainId: 137,
      url: POLYGON_RPC_URL,
    },
    goerli: {
      accounts: [DEPLOYER_ACCOUNT],
      chainId: 5,
      url: GOERLI_RPC_URL,
    },
    sepolia: {
      accounts: [DEPLOYER_ACCOUNT],
      chainId: 11155111,
      url: SEPOLIA_RPC_URL,
    },
    mainnet: {
      accounts: [DEPLOYER_ACCOUNT],
      chainId: 1,
      url: MAINNET_RPC_URL,
    },
  },
  solidity: {
    compilers: [
      {
        version: '0.8.28',
        settings: {
          evmVersion: 'cancun',
          optimizer: {
            enabled: false,
            runs: 200,
          },
        },
      },
      {
        version: '0.8.23',
        settings: {
          evmVersion: 'shanghai',
          optimizer: {
            enabled: false,
            runs: 200,
          },
        },
      },
    ],
  },
  etherscan: {
    apiKey: {
      xdcdev: XDC_API_KEY,
      apothem: XDC_API_KEY,
      xinfin: XDC_API_KEY,
      polygonMumbai: POLYGONSCAN_API_KEY,
      polygonAmoy: POLYGONSCAN_API_KEY,
      polygon: POLYGONSCAN_API_KEY,
      goerli: ETHERSCAN_API_KEY,
      sepolia: ETHERSCAN_API_KEY,
      mainnet: ETHERSCAN_API_KEY,
    },
    customChains: [
      {
        chainId: 551,
        network: 'xdcdev',
        urls: {
          apiURL: 'https://devnetapi.blocksscan.io/api',
          browserURL: 'https://devnet.blocksscan.io/',
        },
      },
      {
        chainId: 51,
        network: 'apothem',
        urls: {
          apiURL: 'https://api-apothem.xdcscan.io/api',
          browserURL: 'https://apothem.xdcscan.io/',
        },
      },
      {
        chainId: 50,
        network: 'xinfin',
        urls: {
          apiURL: 'https://bapi.blocksscan.io/api',
          browserURL: 'https://beta.blocksscan.io/',
        },
      },
    ],
  },
  paths: {
    sources: './contracts',
    tests: './test',
    cache: './cache',
    artifacts: './artifacts',
  },
  mocha: {
    timeout: 600_000,
  },
};
