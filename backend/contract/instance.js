const Web3 = require("web3");
const config = require("./config");

const web3 = new Web3(config.API_URL);

const wakandaTokenContractAddress = config.WAKANDA_TOKEN_CONTRACT_ADDRESS;
const compiledWakandaTokenContract = require("../../smartcontract/artifacts/contracts/WakandaToken.sol/WakandaToken.json");
const wakandaTokenABI = compiledWakandaTokenContract.abi;

const votingContractAddress = config.VOTING_CONTRACT_ADDRESS;
const compiledvotingContract = require("../../smartcontract/artifacts/contracts/Voting.sol/Voting.json");
const votingABI = compiledvotingContract.abi;

module.exports = {
    defaultAccount : (async () => {
        try{
            const accounts = await web3.eth.getAccounts();
            return accounts[0];
        } catch(error) {
            throw new Error("Web3 network not running");
        }
    })(),
    port: config.PORT,
    wakandaTokenContract : new web3.eth.Contract(wakandaTokenABI, wakandaTokenContractAddress),
    votingContract : new web3.eth.Contract(votingABI, votingContractAddress)
} 