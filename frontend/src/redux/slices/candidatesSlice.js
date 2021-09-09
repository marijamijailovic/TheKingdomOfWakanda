import { createSlice } from "@reduxjs/toolkit";
import { getCandidates, addCandidates, getWinningCandidates} from "../thunks/candidatesThunks";

export const candidatesSlice = createSlice({
  name: "candidates",
  initialState: {candidates: [], transaction: [], winners: [], loading: "idle"},
  reducers: {},
  extraReducers: {
    [getCandidates.fulfilled] : (state, action) => {
      state.candidates = action.payload;
    },
    [addCandidates.fulfilled] : (state, action) => {
      state.transaction = action.payload;
    },
    [getWinningCandidates.fulfilled] : (state, action) => {
      state.winners = action.payload;
    }
  }
})

export const candidates = state => state.candidates.candidates;
export const transaction = state => state.candidates.transaction;
export const winners = state => state.candidates.winners;

export default candidatesSlice.reducer;