import { createSlice } from "@reduxjs/toolkit";
import { addDelegator, getDelegators } from "../thunks/delegatorThunks";

export const delegatorSlice = createSlice({
  name: "delegator",
  initialState: {delegators: [], loading: "idle"},
  reducers: {},
  extraReducers: {
    [addDelegator.fulfilled] : (state, action) => {
      state.delegators = action.payload;
    },
    [getDelegators.fulfilled] : (state, action) => {
      state.delegators = action.payload;
    }
  }
})

export const delegators = state => state.delegator.delegators;

export default delegatorSlice.reducer;