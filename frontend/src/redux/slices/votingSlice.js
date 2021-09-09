import { createSlice } from "@reduxjs/toolkit"
import { vote, delegate } from "../thunks/votingThunks";

export const votingSlice = createSlice({
  name: "voting",
  initialState: {voteData: {}, delegateData: {}, loading: "idle"},
  reducers: {},
  extraReducers: {
    [vote.fulfilled] : (state, action) => {
      state.voteData = action.payload;
    },
    [delegate.fulfilled] : (state, action) => {
      state.delegateData = action.payload;
    }
  }
})

export const voteData = state => state.voting.voteData;
export const delegateData = state => state.voting.delegateData;

export default votingSlice.reducer;
