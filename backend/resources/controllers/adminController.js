const constants = require("../../constants");
const voting = require("../../contract/voting");

const addCandidates = async (req, res) => {
    try {
        const candidates = req.body.candidates;
        const size = await voting.getCandidatesSize();
        if(size > 0) {
            res.status(200).json({"status":"success", "reason": constants.MESSAGE.ALREADY_ADDED});
        } else {
            const response = await voting.addCandidates(candidates);
            res.status(200).json({"status":"success", response});
        }
    } catch (error) {
        res.status(500).json({"status":"failed", "reason": error.mesage});
    }
};

const addDelegators = async (req, res) => {
    try {
        const delegatorAddress = req.body.delegatorAddress;
        const allDelegators = await voting.getDelegators();
        const result = allDelegators.some(delegator => delegator === delegatorAddress);
        if(result) {
            res.status(200).json({"status":"success", "reason": constants.MESSAGE.ALREADY_ADDED});
        } else {
            const response = await voting.addDelegators(delegatorAddress);
            res.status(200).json({"status":"success", response});
        }
    } catch (error) {
        res.status(500).json({"status":"failed", "reason": error.mesage});
    }
};

module.exports = {
    addCandidates,
    addDelegators
}