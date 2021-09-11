const constants = require("../../constants");
const uc_admin = require("../user_cases/uc_admin");
const uc_voting = require("../user_cases/uc_voting");

const addAllCandidates = async (req, res) => {
    try {
        const candidates = req.body.candidates;
        const size = await uc_admin.getCandidatesSize();
        if(size > 0) {
            res.status(200).json({"status":"success", "reason": constants.MESSAGE.ALREADY_ADDED});
        } else {
            const response = await uc_admin.addCandidates(candidates);
            res.status(200).json({"status":"success", response});
        }
    } catch (error) {
        res.status(500).json({"status":"failed", "reason": error.mesage});
    }
};

const addDelegator = async (req, res) => {
    try {
        const delegatorAddress = req.body.delegatorAddress;
        const allDelegators = await uc_voting.getDelegators();
        const result = allDelegators.some(delegator => delegator === delegatorAddress);
        if(result) {
            res.status(200).json({"status":"success", "reason": constants.MESSAGE.ALREADY_ADDED});
        } else {
            const response = await uc_admin.addDelegators(delegatorAddress);
            res.status(200).json({"status":"success", response});
        }
    } catch (error) {
        res.status(500).json({"status":"failed", "reason": error.mesage});
    }
};

module.exports = {
    addAllCandidates,
    addDelegator
}