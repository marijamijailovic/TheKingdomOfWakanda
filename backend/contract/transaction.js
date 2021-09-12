const contract = require("./instance");
const web3 = contract.web3;

const signing = async(to, encoded) => {
    try{
        const nonce = await web3.eth.getTransactionCount(contract.defaultAddress, "latest");
        const gasPrice = await web3.eth.getGasPrice();
        const latestBlock = await web3.eth.getBlock("latest");
        const gasLimit = latestBlock.gasLimit;
        const tx = {
            to: to,
            chainId: 42,
            gasPrice: gasPrice,
            gasLimit: gasLimit,
            value: "0x0",
            data: encoded,
            nonce: nonce
        };
        const signTx = await web3.eth.accounts.signTransaction(tx, contract.privateKey);
        const response = await web3.eth.sendSignedTransaction(signTx.rawTransaction);
        return response;
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {signing}