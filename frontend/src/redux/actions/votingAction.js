import Web3 from "web3";
import Voting from "../../artifacts/contracts/Voting.sol/Voting.json";
import { VOTING_CONTRACT_ADDRESS, API_URL } from "../../config";
import {voteRequest, voteSuccess, voteFailure } from "../votingSlice";

export function vote(wakandaAddress, candidateId, amountOfVotes) {
    return async dispatch => {
        dispatch(voteRequest());
        try {
            const web3 = new Web3(Web3.givenProvider || API_URL);
            const voting = new web3.eth.Contract(Voting.abi, VOTING_CONTRACT_ADDRESS);
            const response = await voting.methods.vote(wakandaAddress, candidateId, amountOfVotes).send({from: wakandaAddress});
            if(response) {
                dispatch(voteSuccess(response));
            } else {
                dispatch(voteFailure(response.ErrorText));
            }
        } catch (error) {
            dispatch(voteFailure(error.message));
        }
    }
}