const Web3 = require("web3");
const config = require("../config");
const constants = require("../constants");

const compiledWakandaTokenContract = require(constants.PATH.COMPILED_WKND);
const compiledvotingContract = require(constants.PATH.COMPILED_VOTING);

const web3 = new Web3(new Web3.providers.HttpProvider(config.API_URL));

const wakandaTokenContractAddress = config.WAKANDA_TOKEN_CONTRACT_ADDRESS;
const wakandaTokenABI = compiledWakandaTokenContract.abi;

const votingContractAddress = config.VOTING_CONTRACT_ADDRESS;
const votingABI = compiledvotingContract.abi;

const defaultAddress = config.DEFAULT_ADDRESS;

module.exports = {
    wakandaTokenContract : new web3.eth.Contract(wakandaTokenABI, wakandaTokenContractAddress, {from: defaultAddress}),
    votingContract : new web3.eth.Contract(votingABI, votingContractAddress, {from: defaultAddress})
} 