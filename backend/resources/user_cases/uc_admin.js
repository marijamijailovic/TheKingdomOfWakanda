const voting = require("../../contract/voting");

const addCandidates = async(candidates) => {
    const response = await voting.addCandidates(candidates);
    return response;
}

const addDelegators = async(delegatorAddress) => {
    const response = await voting.addDelegators(delegatorAddress);
    return response;
}

const getCandidatesSize = async() => {
    const response = await voting.getCandidatesSize();
    return response;
}

module.exports = {
    addCandidates,
    addDelegators,
    getCandidatesSize
};