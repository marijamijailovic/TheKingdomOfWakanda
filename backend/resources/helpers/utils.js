const voting = require("../../contract/voting");

const isRegistered = async (address) => {
    const registered = await voting.isWakandaRegistered(address);
    return registered;
}

const isVoted = async (address) => {
    const voted = await voting.isWakandaVoted(address);
    return voted;
}

module.exports = {
    isRegistered,
    isVoted
}