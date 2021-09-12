const constants = require("../../constants");
const STATUS = constants.RESPONSE_STATUS;
const MESSAGE = constants.MESSAGE;
const response = require("../../utils/response");
const createResponse = response.createResponse;
const uc_registration = require("../user_cases/uc_registration");
const uc_voting = require("../user_cases/uc_voting");

const wakandaRegistration = async (req, res, next) => { 
    try {
        const wakandaAddress = req.body.wakandaAddress;
        if(wakandaAddress){
            const wakandaStatus = await uc_voting.getWakandaStatus(wakandaAddress);
            if(!wakandaStatus.registered) {
                const result = await uc_registration.completeRegistration(wakandaAddress);
                createResponse(res, STATUS.OK, STATUS.SUCCESS, result);
            } else if(!wakandaStatus.hasVoted){
                createResponse(res, STATUS.OK, STATUS.SUCCESS, MESSAGE.ALREADY_REGISTERED);
            } else {
                createResponse(res, STATUS.OK, STATUS.SUCCESS, MESSAGE.ALREADY_VOTED);
            }
        } else{
            createResponse(res, constants.RESPONSE_STATUS.NOT_FOUND, constants.RESPONSE_STATUS.FAILED, MESSAGE.WRONG_INPUT);
        }
    } catch(error) {
        next(error);
    }
}

const getAllCandidates = async(req, res, next) => {
    try{
        const result = await uc_voting.getCandidates();
        createResponse(res, STATUS.OK, STATUS.SUCCESS, result);
    } catch (error) {
        next(error);
    }
}

const getAllDelegators = async(req, res, next) => {
    try{
        const result = await uc_voting.getAllDelegators();
        createResponse(res, STATUS.OK, STATUS.SUCCESS, result);
    } catch (error) {
        next(error);
    }
}

const getWinningCandidates = async(req, res, next) => {
    try{
        const result = await uc_voting.getWinningCandidates();
        createResponse(res, STATUS.OK, STATUS.SUCCESS, result);
    } catch (error) {
        next(error)
    }
}

const getWakandaStatus = async (req, res, next) => {
    try {
        const wakandaAddress = req.query.wakandaAddress;
        if(wakandaAddress){
            const result = await uc_voting.getWakandaStatus(wakandaAddress);
            createResponse(res, STATUS.OK, STATUS.SUCCESS, result);
        }else{
            createResponse(res, constants.RESPONSE_STATUS.NOT_FOUND, constants.RESPONSE_STATUS.FAILED, MESSAGE.WRONG_INPUT);
        }
    } catch(error) {
        next(error);
    }
}

const getWakandaBalance = async (req, res, next) => {
    try {
        const wakandaAddress = req.query.wakandaAddress;
        if(wakandaAddress){
            const result = await uc_voting.getWakandaBalance(wakandaAddress);
            createResponse(res, STATUS.OK, STATUS.SUCCESS, result);
        }else{
            createResponse(res, constants.RESPONSE_STATUS.NOT_FOUND, constants.RESPONSE_STATUS.FAILED, MESSAGE.WRONG_INPUT);
        }
    } catch(error) {
        next(error);
    }
}

module.exports = {
    wakandaRegistration,
    getAllCandidates,
    getAllDelegators,
    getWinningCandidates,
    getWakandaStatus,
    getWakandaBalance
}