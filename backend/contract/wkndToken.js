const contract = require("./instance");
const wkndTokenContract = contract.wakandaTokenContract;

const getBalance = async(wakandaAddress) => {
    try {
        const response = await wkndTokenContract.methods.balanceOf(wakandaAddress).call();
        return response;
    } catch(error) {
        console.log(error);
        throw new Error(error.message);
    }
}

module.exports = {
    getBalance
}