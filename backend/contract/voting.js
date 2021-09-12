const contract = require("./instance");
const votingContract = contract.votingContract;

const addCandidates = async(candidates) => {
    try {
        const response = await votingContract.methods.addCandidates(candidates).send();
        return response;
    } catch(error) {
        throw new Error(error.message);
    }
}

const getCandidates = async() => {
    try {
        const response = await votingContract.methods.getCandidates().call();
        return response;
    } catch(error) {
        throw new Error(error.message);
    }
}

const getCandidatesSize = async() => {
    try {
        const response = await votingContract.methods.getCandidatesSize().call();
        return response;
    } catch(error) {
        throw new Error(error.message);
    }
}

const addDelegators = async(delegatorAddress) => {
    try {
        const response = await votingContract.methods.addDelegators(delegatorAddress).send();
        return response;
    } catch(error) {
        throw new Error(error.message);
    }
}

const getDelegators = async() => {
    try {
        const response = await votingContract.methods.getDelegators().call();
        return response;
    } catch(error) {
        throw new Error(error.message);
    }
}

const getWakanda = async(wakandaAddress) => {
    try {
        const response = await votingContract.methods.getWakanda(wakandaAddress).call();
        return response;
    } catch (error) {
        throw new Error(error.message);
    }
}

const registration = async(wakandaAddress) => {
    try {
        const response = await votingContract.methods.registration(wakandaAddress).send();
        return response;
    } catch(error) {
        throw new Error(error.message);
    }
}

const getLatestWinners = async() => {
    const events = await votingContract.getPastEvents("NewChallenger",{fromBlock:0, toBlock:"latest"});
    const lastWinners = events.length !== 0 ? events[events.length-1].returnValues[0] : [];
    return lastWinners;
}

const newChallenger = async(leaderboard) => {
    const response = await votingContract.methods.newChallenger(leaderboard).send();
    return response;
}

const delegateVote = async(wakandaAddress, delegatorAddress) => {
    try{
        const response = await votingContract.methods.delegateVote(wakandaAddress, delegatorAddress).send({from: wakandaAddress});
        return response;
    } catch(error) {
        throw new Error(error.message);
    }
}

const getWinningCandidates = async() => {
    try {
        const response = await votingContract.methods.winningCandidates().call();
        return response;
    } catch(error) {
        throw new Error(error.message);
    }
}

module.exports = {
    addCandidates,
    getCandidates,
    getCandidatesSize,
    addDelegators,
    getDelegators,
    getWakanda,
    registration,
    getLatestWinners,
    newChallenger,
    delegateVote,
    getWinningCandidates
}