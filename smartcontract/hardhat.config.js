require("dotenv").config();
require("@nomiclabs/hardhat-ethers");

const { 
  API_URL_LOCAL,
  API_URL_KOVAN_ALCHEMY,
  PRIVATE_KEY_KOVAN 
} = process.env;

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config").HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  paths: {
    artifacts: "../frontend/src/artifacts",
  },
  networks: {
    localhost: {
      url: API_URL_LOCAL
    },
    kovan: {
      url: API_URL_KOVAN_ALCHEMY,
      accounts: [`0x${PRIVATE_KEY_KOVAN}`]
    },
    hardhat: {
      chainId: 1337
    }
  }
};
