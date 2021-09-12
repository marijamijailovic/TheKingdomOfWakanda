const constants = require("../../constants");
const STATUS = constants.RESPONSE_STATUS;
const MESSAGE = constants.MESSAGE;
const response = require("../../utils/response");
const createResponse = response.createResponse;
const uc_admin = require("../user_cases/uc_admin");
const uc_voting = require("../user_cases/uc_voting");

const addAllCandidates = async (req, res, next) => {
    try {
        const candidates = req.body.candidates;
        const size = await uc_admin.getCandidatesSize();
        if(size > 0) {
            createResponse(res, STATUS.OK, STATUS.SUCCESS, MESSAGE.ALREADY_ADDED);
        } else {
            const result = await uc_admin.addCandidates(candidates);
            createResponse(res, STATUS.OK, STATUS.SUCCESS, result);
        }
    } catch (error) {
        next(error);
    }
};

const addDelegator = async (req, res, next) => {
    try {
        const delegatorAddress = req.body.delegatorAddress;
        const delegator = await uc_voting.getWakandaStatus(delegatorAddress);
        if(delegator.isDelegator || delegator.registered) {
            createResponse(res, STATUS.OK, STATUS.SUCCESS, MESSAGE.ALREADY_ADDED);
        } else {
            const result = await uc_admin.addDelegators(delegatorAddress);
            createResponse(res, STATUS.OK, STATUS.SUCCESS, result);
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    addAllCandidates,
    addDelegator
}