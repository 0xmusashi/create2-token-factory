/** @type import('hardhat/config').HardhatUserConfig */
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()
module.exports = {
  defaultNetwork: "sepolia",
  solidity: "0.8.20",
  networks: {
    hardhat: {
    },
    sepolia: {
      url: process.env.TESTNET_RPC_URL,
      accounts: [process.env.PRIVATE_KEY]
    },
    baseSepolia: {
      url: process.env.TESTNET_RPC_URL,
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: {
      baseSepolia: process.env.BASE_API_KEY
    }
  }
};