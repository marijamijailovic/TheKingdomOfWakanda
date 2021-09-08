const wkndToken = require("../../contract/wkndToken");
const voting = require("../../contract/voting");
const constants = require("../../constants");
const helpers = require("../helpers/utils");

const wakandaRegistration = async (req, res) => { 
    try {
        const wakandaAddress = req.body.wakandaAddress;
        const votingToken = 1;
        if(wakandaAddress){
            const registered = await helpers.isRegistered(wakandaAddress);
            if(!registered) {
                const response = await voting.registration(wakandaAddress, votingToken);
                res.status(200).json({"status":"success", response});
            } else {
                const voted = await helpers.isVoted(wakandaAddress);
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

const getWakandaStatus = async (req,res)=>{
    try {
        const wakandaAddress = req.query.wakandaAddress;
        if(wakandaAddress){
            const balance = await wkndToken.getBalance(wakandaAddress);
            const registered = await helpers.isRegistered(wakandaAddress);
            const response = {balance, registered};
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

const getDelegators = async(req, res) => {
    try{
        const response = await voting.getDelegators();
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
    getWakandaStatus,
    getCandidates,
    getDelegators,
    getWinningCandidates,
}