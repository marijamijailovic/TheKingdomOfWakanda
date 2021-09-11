const constants = require("../../constants");
const uc_registration = require("../user_cases/uc_registration");
const uc_voting = require("../user_cases/uc_voting");

const wakandaRegistration = async (req, res) => { 
    try {
        const wakandaAddress = req.body.wakandaAddress;
        const votingToken = 1;
        if(wakandaAddress){
            const registered = await uc_registration.isRegistered(wakandaAddress);
            if(!registered) {
                const response = await uc_registration.completeRegistration(wakandaAddress, votingToken);
                res.status(200).json({"status":"success", response});
            } else {
                const voted = await uc_voting.isVoted(wakandaAddress);
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
            const balance = await uc_voting.getBalance(wakandaAddress);
            const registered = await uc_registration.isRegistered(wakandaAddress);
            const response = {balance, registered};
            res.status(200).json({"status":"success", response});
        }else{
            res.status(400).json({"status":"failed", "reason": constants.MESSAGE.WRONG_INPUT});
        }
    } catch(error) {
        res.status(500).json({"status":"failed", "reason": error.message});
    }
}

const getAllCandidates = async(req, res) => {
    try{
        const response = await uc_voting.getCandidates();
        res.status(200).json({"status":"success", response});
    } catch (error) {
        res.status(500).json({"status":"failed", "reason": error.message});
    }
}

const getAllDelegators = async(req, res) => {
    try{
        const response = await uc_voting.getDelegators();
        res.status(200).json({"status":"success", response});
    } catch (error) {
        res.status(500).json({"status":"failed", "reason": error.message});
    }
}

const getWinningCandidates = async(req, res) => {
    try{
        const response = await uc_voting.getWinningCandidates();
        res.status(200).json({"status":"success", response});
    } catch (error) {
        res.status(500).json({"status":"failed", "reason": error.message});
    }
}

module.exports = {
    wakandaRegistration,
    getWakandaStatus,
    getAllCandidates,
    getAllDelegators,
    getWinningCandidates,
}