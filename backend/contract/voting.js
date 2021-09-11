const contract = require("./instance");
const votingContract = contract.votingContract;

const addCandidates = async(candidates) => {
    try {
        const response = await votingContract.methods.addCandidates(candidates).send();
        return response;
    } catch(error) {
        console.log(error);
        throw new Error(error.message);
    }
}

const getCandidates = async() => {
    try {
        const response = await votingContract.methods.getCandidates().call();
        return response;
    } catch(error) {
        console.log(error);
        throw new Error(error.message);
    }
}

const getCandidatesSize = async() => {
    try {
        const response = await votingContract.methods.getCandidatesSize().call();
        return response;
    } catch(error) {
        console.log(error);
        throw new Error(error.message);
    }
}

const addDelegators = async(delegatorAddress) => {
    try {
        const response = await votingContract.methods.addDelegators(delegatorAddress).send();
        return response;
    } catch(error) {
        console.log(error);
        throw new Error(error.message);
    }
}

const getDelegators = async() => {
    try {
        const response = await votingContract.methods.getDelegators().call();
        return response;
    } catch(error) {
        console.log(error);
        throw new Error(error.message);
    }
}

const isWakandaRegistered = async(wakandaAddress) => {
    try {
        const response = await votingContract.methods.isWakandaRegistered(wakandaAddress).call();
        return response;
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
}

const isWakandaVoted = async(wakandaAddress) => {
    try {
        const response = await votingContract.methods.isWakandaVoted(wakandaAddress).call();
        return response;
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
}

const registration = async(wakandaAddress, votingToken) => {
    try {
        const response = await votingContract.methods.registration(wakandaAddress, votingToken).send();
        return response;
    } catch(error) {
        console.log(error);
        throw new Error(error.message);
    }
}

const getLastWinners = async() => {
    const events = await votingContract.getPastEvents("NewChallenger");
    const lastWinners = events.length === 0 ? events : events[0].returnValues[0];
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
        console.log(error);
        throw new Error(error.message);
    }
}

const getWinningCandidates = async() => {
    try {
        const response = await votingContract.methods.winningCandidates().call();
        return response;
    } catch(error) {
        console.log(error);
        throw new Error(error.message);
    }
}

module.exports = {
    addCandidates,
    getCandidates,
    getCandidatesSize,
    addDelegators,
    getDelegators,
    isWakandaRegistered,
    isWakandaVoted,
    registration,
    getLastWinners,
    newChallenger,
    delegateVote,
    getWinningCandidates
}