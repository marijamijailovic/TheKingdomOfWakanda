const voting = require("../../../contract/voting");

const updateLeaderboard = async (candidates) => {
    const newWinnersId = getIdsOfTop3Candidates(candidates);
    const oldWinnersId = await voting.getLatestWinners();
    const isDifferent = compare(newWinnersId, oldWinnersId);
    let response = [];
        
    if(isDifferent) {
        response = await voting.newChallenger(newWinnersId);
    } 
    return response;
}

const getIdsOfTop3Candidates = (candidates) => {
    const candidatesCopy = [...candidates];
    candidatesCopy.sort((c1, c2)=> (c2.score-c1.score));
    const newWinners = candidatesCopy.slice(0,3).filter(candidate => candidate.score > 0);
    const newWinnersId = newWinners.map((winner)=> {return winner.id});

    return newWinnersId;
}

const compare = (newWinnersId, oldWinnersId) => {
    const newLeaders = newWinnersId.filter(newWin => {
        return !oldWinnersId.some(oldWin => oldWin === newWin)
    });
    
    if(newLeaders.length > 0) {
        return true;
    }
    return false;
}

module.exports = {updateLeaderboard}
