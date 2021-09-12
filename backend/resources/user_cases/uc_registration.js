const voting = require("../../contract/voting");

const completeRegistration = async (wakandaAddress) => {
    const response = await voting.registration(wakandaAddress);
    return response;
}

module.exports = {
    completeRegistration
}