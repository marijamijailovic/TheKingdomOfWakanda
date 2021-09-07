const wkndToken = require("../../contract/wkndToken");
const voting = require("../../contract/voting");
const constants = require("../../constants");

const wakandaRegistration = async (req, res) => { 
    try {
        const wakandaAddress = req.body.wakandaAddress;
        const votingToken = 1;
        if(wakandaAddress){
            const registered = await voting.isWakandaRegistered(wakandaAddress);
            if(!registered) {
                const transferSuccess = await wkndToken.transferForVoting(wakandaAddress, votingToken);
                if(transferSuccess) {
                    const response = await voting.finishRegistration(wakandaAddress);
                    res.status(200).json({"status":"success", "reason": constants.MESSAGE.SUCCESS_REGISTRATION });
                }
            } else {
                const voted = await voting.isWakandaVoted(wakandaAddress);
                if(!voted){
                    res.status(200).json({"status":"success", "reason": constants.MESSAGE.ALREADY_REGISTERED});
                } else {
                    res.status(200).json({"status":"success", "reason": constants.MESSAGE.ALREADY_VOTED});
                }
            }
        } else{
            res.status(400).json({"status":"failed", "reason": constants.MESSAGE.WRONG_INPUT});
        }
    } catch(error) {
        res.status(500).json({"status":"failed", "reason": error.messsage});
    }
}

const getBalance = async (req,res)=>{
    try {
        const wakandaAddress = req.query.wakandaAddress;
        if(wakandaAddress){
            const response = await wkndToken.getBalance(wakandaAddress);
            res.status(200).json({"status":"success", response});
        }else{
            res.status(400).json({"status":"failed", "reason": constants.MESSAGE.WRONG_INPUT});
        }
    } catch(error) {
        res.status(500).json({"status":"failed", "reason": error.message});
    }
}

const getCandidates = async(req, res) => {
    try{
        const response = await voting.getCandidates();
        res.status(200).json({"status":"success", response});
    } catch (error) {
        res.status(500).json({"status":"failed", "reason": error.message});
    }
}

const getWinningCandidates = async (req,res) => {
    try {
        const winners = await voting.getWinningCandidates();
        const response = [...winners];
        response.sort((c1, c2)=> (c2.score-c1.score));
        res.status(200).json({"status":"success", response});
    } catch (error) {
        res.status(500).json({"status":"failed", "reason":error.message});
    }
}

module.exports = {
    wakandaRegistration,
    getBalance,
    getCandidates,
    getWinningCandidates
}