import { isNull } from "../helpers/utils";
import Web3 from "web3";
import Voting from "../artifacts/contracts/Voting.sol/Voting.json";
import { VOTING_CONTRACT_ADDRESS, API_URL } from "../config";
import { createErrorResponse, createOKResponse } from "./responses";

const web3 = new Web3(Web3.givenProvider || API_URL);
console.log(web3)
const voting = new web3.eth.Contract(Voting.abi, VOTING_CONTRACT_ADDRESS);

export const vote = async(wakandaAddress, candidateId, amountOfVotes) => {
    try {
        const response = await voting.methods.vote(wakandaAddress, candidateId, amountOfVotes).send({from:wakandaAddress});
        if(!isNull(response)) {
            return createOKResponse({response : response});
        } else {
            return createErrorResponse(response.code, response.message);
        }
    } catch (error) {
        return createErrorResponse(error.code, error.message);
    }
}

export const delegateVote = async(wakandaAddress, delegatorAddress) => {
    try {
        const response = await voting.methods.delegateVote(wakandaAddress, delegatorAddress).send({from:wakandaAddress});
        if(!isNull(response)) {
            return createOKResponse({response : response});
        } else {
            return createErrorResponse(response.code, response.message);
        }
    } catch (error) {
        return createErrorResponse(error.code, error.message);
    }
}
