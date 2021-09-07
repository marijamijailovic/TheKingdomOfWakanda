const voting = require("../../contract/voting");

const addCandidates = async (req, res) => {
    try {
        const candidates = req.body.candidates;
        const response = await voting.addCandidates(candidates);
        res.status(200).json({"status":"success", response});
    } catch (error) {
        res.status(500).json({"status":"failed", "reason": error.mesage});
    }
};

module.exports = {addCandidates}