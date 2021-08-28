const Web3 = require("web3");

const httpEndPoint = "http://127.0.0.1:8545";
const web3 = new Web3(httpEndPoint);

const wakandaTokenContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const compiledWakandaTokenContract = require("../../smartcontract/artifacts/contracts/WakandaToken.sol/WakandaToken.json");
const wakandaTokenABI = compiledWakandaTokenContract.abi;

const votingContractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const compiledvotingContract = require("../../smartcontract/artifacts/contracts/Voting.sol/Voting.json");
const votingABI = compiledvotingContract.abi;

module.exports = {
    defaultAccount : (async () => {
        const accounts = await web3.eth.getAccounts();
        return accounts[0];
    })(),
    wakandaTokenContract : new web3.eth.Contract(wakandaTokenABI, wakandaTokenContractAddress),
    votingContract : new web3.eth.Contract(votingABI, votingContractAddress)
} 