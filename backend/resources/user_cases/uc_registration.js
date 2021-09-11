const voting = require("../../contract/voting");

const isRegistered = async (address) => {
    const registered = await voting.isWakandaRegistered(address);
    return registered;
}

const completeRegistration = async (wakandaAddress, votingToken) => {
    const response = await voting.registration(wakandaAddress, votingToken);
    return response;
}

module.exports = {
    isRegistered,
    completeRegistration
}