const voting = require("../../../contract/voting");

const updateLeaderboard = async (candidates) => {
    const candidatesCopy = [...candidates];
    candidatesCopy.sort((c1, c2)=> (c2.score-c1.score));
    const newWinners = candidatesCopy.slice(0,3).filter(candidate => candidate.score > 0);
    const newWinnersId = newWinners.map((winner)=> {return winner.id});
    const oldWinnersId = await voting.getLatestWinners();

    const newLeaders = newWinnersId.filter(newWin => {
        return !oldWinnersId.some(oldWin => oldWin === newWin)
    });

    let response = [];
        
    if(newLeaders.length > 0 || newWinnersId.length !== oldWinnersId.length) {
        response = await voting.newChallenger(newWinnersId);
    } 
    return response;
}

module.exports = {updateLeaderboard}
