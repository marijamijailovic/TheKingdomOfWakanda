const contract = require("./instance");
const votingContract = contract.votingContract;
const transaction = require("./transaction");

const addCandidates = async(candidates) => {
    try {
        const encoded = votingContract.methods.addCandidates(candidates).encodeABI();
        const response = await transaction.signing(contract.votingContract._address, encoded);
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
        const encoded = votingContract.methods.addDelegators(delegatorAddress).encodeABI();
        const response = await transaction.signing(contract.votingContract._address, encoded);
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
        const encoded = votingContract.methods.registration(wakandaAddress).encodeABI();
        const response = await transaction.signing(contract.votingContract._address, encoded);
        return response;
    } catch(error) {
        throw new Error(error.message);
    }
}

const getLatestWinners = async() => {
    const events = await votingContract.getPastEvents("NewChallenger",{ 
        fromBlock:0, toBlock:"latest"
    });
    const lastWinners = events.length !== 0 ? events[events.length-1].returnValues[0] : [];
    return lastWinners;
}

const newChallenger = async(leaderboard) => {
    const encoded = votingContract.methods.newChallenger(leaderboard).encodeABI();
    const response = await transaction.signing(contract.votingContract._address, encoded);
    return response;
}

// const delegateVote = async(wakandaAddress, delegatorAddress) => {
//     try{
//         const response = await votingContract.methods.delegateVote(wakandaAddress, delegatorAddress).send({from: wakandaAddress});
//         return response;
//     } catch(error) {
//         throw new Error(error.message);
//     }
// }

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
    //delegateVote,
    getWinningCandidates
}