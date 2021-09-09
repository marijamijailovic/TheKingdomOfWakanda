import { createAsyncThunk } from "@reduxjs/toolkit";
import * as candidateService from "../../services/candidateService";

export const getCandidates = createAsyncThunk("candidates/getCandidates", async () => {
    const response = await candidateService.getCandidates();
    if(response.OK) {
      return response.Data;
    } else {
      return response.Error;
    }
  });
  
  export const addCandidates = createAsyncThunk("candidates/addCandidates", async (allCandidates) => {
    const response = await candidateService.addCandidates(allCandidates);
    if(response.OK) {
      return response.Data;
    } else {
      return response.Error;
    }
  });
  
  export const getWinningCandidates = createAsyncThunk("candidates/getWinningCandidates", async (allCandidates)=>{
    const response = await candidateService.getWinners(allCandidates);
    if(response.OK) {
      return response.Data;
    } else {
      return response.Error;
    }
  });