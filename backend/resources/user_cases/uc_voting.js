const wkndToken = require("../../contract/wkndToken");
const voting = require("../../contract/voting");
const leaderboard = require("./helpers/leaderboard");

const getWakandaStatus = async(wakandaAddress) => {
    const response = await voting.getWakanda(wakandaAddress);
    return response;
}

const getWakandaBalance = async(wakandaAddress) => {
    const response = await wkndToken.getBalance(wakandaAddress);
    return response;
}

const getCandidates = async() => {
    const response = await voting.getCandidates();
    return response
}

const getAllDelegators = async() => {
    const response = await voting.getDelegators();
    return response;
}

const getWinningCandidates = async() => {
    const candidates = await getCandidates();
    const emitResponse = await leaderboard.updateLeaderboard(candidates);
    const response = await voting.getWinningCandidates();
    const sortWinners = [...response];
    sortWinners.sort((c1, c2)=> (c2.score-c1.score));
    return sortWinners;
}

module.exports = {
    getWakandaStatus,
    getWakandaBalance,
    getCandidates,
    getAllDelegators,
    getWinningCandidates
};