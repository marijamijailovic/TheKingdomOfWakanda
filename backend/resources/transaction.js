const contract = require('../contract/instance');
const constants = require('../constants');

registrationTx = async (wakandaAddress, defaultAccount) => {
    try{
        const encoded = contract.wakandaTokenContract.methods.transfer(wakandaAddress, constants.VOTING_WKND_TOKEN).encodeABI();
        const nonce = await contract.web3.eth.getTransactionCount(defaultAccount, "latest");
        const gasPrice = await contract.web3.eth.getGasPrice();
        const latestBlock = await contract.web3.eth.getBlock("latest");
        const gasLimit = latestBlock.gasLimit;
        const tx = {
            to: contract.wakandaTokenContract._address,
            gasPrice: gasPrice,
            gasLimit: gasLimit,
            value: "0x0",
            data: encoded,
            nonce: nonce
        };
        const signTx = await contract.web3.eth.accounts.signTransaction(tx, contract.privateKey);
        const response = await contract.web3.eth.sendSignedTransaction(signTx.rawTransaction);
        return response;
    } catch(error) {
        throw new Error(error);
    }
}

votingTx = async (wakandaAddress, candidateId, candidate, amountOfVotes, defaultAccount) => {
    try {
        const encoded = contract.votingContract.methods.vote(wakandaAddress, candidateId, candidate, amountOfVotes).encodeABI();
        const nonce = await contract.web3.eth.getTransactionCount(defaultAccount, "latest");
        const gasPrice = await contract.web3.eth.getGasPrice();
        const latestBlock = await contract.web3.eth.getBlock("latest");
        const gasLimit = latestBlock.gasLimit;
        const tx = {
            to: contract.votingContract._address,
            gasPrice: gasPrice,
            gasLimit: gasLimit,
            value: "0x0",
            data: encoded,
            nonce: nonce
        };
        const signTx = await contract.web3.eth.accounts.signTransaction(tx, contract.privateKey);
        const response = await contract.web3.eth.sendSignedTransaction(signTx.rawTransaction);
        return response;
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    registrationTx: registrationTx,
    votingTx: votingTx
}