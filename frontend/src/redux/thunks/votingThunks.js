import { createAsyncThunk } from "@reduxjs/toolkit";
import * as votingService from "../../services/votingService";

export const vote = createAsyncThunk("voting/vote", async ({wakandaAddress, candidateId, amountOfVotes}) => {
    const response = await votingService.vote(wakandaAddress, candidateId, amountOfVotes);
    if(response.OK) {
        return response.Data;
    } else {
        return response.Error;
    }
});
  
export const delegate = createAsyncThunk("voting/delegator", async({wakandaAddress, delegatorAddress}) => {
    const response = await votingService.delegateVote(wakandaAddress, delegatorAddress);
    if(response.OK) {
        return response.Data;
    } else {
        return response.Error;
    }
});