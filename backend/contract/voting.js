const contract = require("./instance");
const votingContract = contract.votingContract;

const addCandidates = async(candidates) => {
    try {
        const response = await votingContract.methods.addCandidates(candidates).send();
        return response;
    } catch(error) {
        console.log(error);
    }
}

const isWakandaRegistered = async(wakandaAddress) => {
    try {
        const response = await votingContract.methods.isWakandaRegistered(wakandaAddress).call();
        return response;
    } catch (error) {
        console.log(error);
    }
}

const isWakandaVoted = async(wakandaAddress) => {
    try {
        const response = await votingContract.methods.isWakandaVoted(wakandaAddress).call();
        return response;
    } catch (error) {
        console.log(error);
    }
}

const finishRegistration = async(wakandaAddress) => {
    try {
        const response = await votingContract.methods.registration(wakandaAddress).send();
        return response;
    } catch(error) {
        console.log(error);
    }
}

const getCandidates = async() => {
    try {
        const response = await votingContract.methods.getCandidates().call();
        return response;
    } catch(error) {
        console.log(error);
    }
}

const getWinningCandidates = async() => {
    try {
        const response = await votingContract.methods.winningCandidates().call();
        return response;
    } catch(error) {
        console.log(error);
    }
}

module.exports = {
    addCandidates,
    isWakandaRegistered,
    isWakandaVoted,
    finishRegistration,
    getCandidates,
    getWinningCandidates
}