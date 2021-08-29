const Web3 = require("web3");
const constants = require("../constants");
const config = require("./config");

const web3 = new Web3(new Web3.providers.HttpProvider(config.API_URL));

const wakandaTokenContractAddress = config.WAKANDA_TOKEN_CONTRACT_ADDRESS;
const compiledWakandaTokenContract = require(constants.PATH.COMPILED_WKND);
const wakandaTokenABI = compiledWakandaTokenContract.abi;

const votingContractAddress = config.VOTING_CONTRACT_ADDRESS;
const compiledvotingContract = require(constants.PATH.COMPILED_VOTING);
const votingABI = compiledvotingContract.abi;

module.exports = {
    defaultAccount: config.DEFAULT_ADDRESS,
    privateKey: config.PRIVATE_KEY,
    port: config.PORT,
    wakandaTokenContract : new web3.eth.Contract(wakandaTokenABI, wakandaTokenContractAddress),
    votingContract : new web3.eth.Contract(votingABI, votingContractAddress),
    web3: web3
} 