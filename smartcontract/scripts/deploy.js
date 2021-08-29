// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const axios = require('axios');

const CANDIDATES_LIST = {
  URL: "https://wakanda.zmilos.com/list"
}

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  // We get the contract to deploy
  const WakandaToken = await hre.ethers.getContractFactory("WakandaToken");
  const wakandaToken = await WakandaToken.deploy();

  console.log("WakandaToken deployed to:", wakandaToken.address);

  const response = await axios({
    method: "get", 
    headers: {"Content-Type": "application/json"}, 
    url: CANDIDATES_LIST.URL
  });
  
  if(response && response.data && response.data.candidates) {   
    const Voting = await hre.ethers.getContractFactory("Voting");
    const voting = await Voting.deploy(wakandaToken.address, response.data.candidates);

    await voting.deployed();

    console.log("Voting deployed to:", voting.address); 
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
