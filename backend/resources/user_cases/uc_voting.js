const wkndToken = require("../../contract/wkndToken");
const voting = require("../../contract/voting");

const getBalance = async(wakandaAddress) => {
    const response = await wkndToken.getBalance(wakandaAddress);
    return response;
}

const getCandidates = async() => {
    const response = await voting.getCandidates();
    return response
}

const isVoted = async (address) => {
    const voted = await voting.isWakandaVoted(address);
    return voted;
}

const getDelegators = async() => {
    const response = await voting.getDelegators();
    return response;
}

const getLastWinners = async() => {
    const response = await voting.getLastWinners();
    return response
}

const newChallenger = async(leaderboard) => {
    const response = await voting.newChallenger(leaderboard);
    return response
}

const updateLeaderboard = async () => {
    const candidates = await getCandidates();
    const candidatesCopy = [...candidates];
    candidatesCopy.sort((c1, c2)=> (c2.score-c1.score));
    const newWinners = candidatesCopy.slice(0,3).filter(candidate => candidate.score > 0);
    const oldWinners = await getLastWinners();
    //Find values that are in newWinners but not in oldWinners
    const difference = newWinners.filter(newWin => {
        return !oldWinners.some(oldWin => oldWin.id === newWin.id)
    });

    let response = [];
        
    if(newWinners.length != oldWinners.length || difference.length > 0) {
        response = await newChallenger(newWinners);
    } 
    return response;
}

const getWinningCandidates = async() => {
    const emitResponse = await updateLeaderboard();
    const response = await voting.getWinningCandidates();
    return response;
}

module.exports = {
    getBalance,
    getCandidates,
    getDelegators,
    isVoted,
    getLastWinners,
    newChallenger,
    getWinningCandidates
};