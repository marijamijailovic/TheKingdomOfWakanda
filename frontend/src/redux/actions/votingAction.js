import Web3 from "web3";
import Voting from "../../artifacts/contracts/Voting.sol/Voting.json";
import { VOTING_CONTRACT_ADDRESS, API_URL } from "../../config";
import { voteSuccess, voteFailure } from "../slices/votingSlice";

const web3 = new Web3(Web3.givenProvider || API_URL);
const voting = new web3.eth.Contract(Voting.abi, VOTING_CONTRACT_ADDRESS);

export function vote(wakandaAddress, candidateId, amountOfVotes) {
    return async dispatch => {
        try {
            const response = await voting.methods.vote(wakandaAddress, candidateId, amountOfVotes).send({from:wakandaAddress});
            if(response) {
                dispatch(voteSuccess(response));
            }
      } catch (error) {
          dispatch(voteFailure(error.message));
      }
    }
}

export function delegateVote(wakandaAddress, delegatorAddress) {
  return async dispatch => {
      try {
            const response = await voting.methods.delegateVote(wakandaAddress, delegatorAddress).send({from: wakandaAddress});
            if(response) {
                dispatch(voteSuccess(response));
            }
      } catch (error) {
          dispatch(voteFailure(error.message));
      }
  }
}
