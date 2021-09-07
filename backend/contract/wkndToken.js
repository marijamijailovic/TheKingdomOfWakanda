const contract = require("./instance");
const wkndTokenContract = contract.wakandaTokenContract;

const transferForVoting = async(wakandaAddress, amount) => {
    try {
        const response = await wkndTokenContract.methods.transfer(wakandaAddress, amount).send();
        return response;
    } catch(error) {
        console.log(error);
    }
}

const getBalance = async(wakandaAddress) => {
    try {
        const response = await wkndTokenContract.methods.balanceOf(wakandaAddress).call();
        return response;
    } catch(error) {
        console.log(error);
    }
}

module.exports = {
    transferForVoting,
    getBalance
}