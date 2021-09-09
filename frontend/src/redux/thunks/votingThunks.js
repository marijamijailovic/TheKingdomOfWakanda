import { createAsyncThunk } from "@reduxjs/toolkit";
import Web3 from "web3";
import Voting from "../../artifacts/contracts/Voting.sol/Voting.json";
import { VOTING_CONTRACT_ADDRESS, API_URL } from "../../config";

const web3 = new Web3(Web3.givenProvider || API_URL);
const voting = new web3.eth.Contract(Voting.abi, VOTING_CONTRACT_ADDRESS);

export const vote = createAsyncThunk("voting/vote", async ({wakandaAddress, candidateId, amountOfVotes}) => {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const response = await voting.methods.vote({wakandaAddress, candidateId, amountOfVotes}).send({from:wakandaAddress});
    debugger;
    if(response.OK) {
        return response.Data;
    } else {
        return response.Error;
    }
});
  
export const delegate = createAsyncThunk("voting/delegator", async({wakandaAddress, delegatorAddress}) => {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const response = await voting.methods.delegateVote(wakandaAddress, delegatorAddress).send({from: wakandaAddress});
    if(response.OK) {
        return response.Data;
    } else {
        return response.Error;
    }
});