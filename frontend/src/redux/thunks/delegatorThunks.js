import { createAsyncThunk } from "@reduxjs/toolkit";
import * as delegatorService from "../../services/delegatorService";

export const addDelegator = createAsyncThunk("delegator/adDdelegator", async (delegatorAddress) => {
    const response = await delegatorService.addDelegator(delegatorAddress);
    if(response.OK) {
        return response.Data;
    } else {
        return response.Error;
    }
});
  
export const getDelegators = createAsyncThunk("delegator/getDelegators", async() => {
    const response = await delegatorService.getDelegators();
    if(response.OK) {
        return response.Data;
    } else {
        return response.Error;
    }
});