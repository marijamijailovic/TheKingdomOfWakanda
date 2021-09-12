import { createSlice } from "@reduxjs/toolkit";
import { addDelegator, getDelegators } from "../thunks/delegatorThunks";

export const delegatorSlice = createSlice({
  name: "delegator",
  initialState: {delegators: [], loading: "idle"},
  reducers: {
    updateDelegatorState: (state) =>{
      state.delegators = [];
      state.loading = "idle";
    }
  },
  extraReducers: {
    [addDelegator.fulfilled] : (state, action) => {
      state.delegators = action.payload;
    },
    [getDelegators.fulfilled] : (state, action) => {
      state.delegators = action.payload;
    }
  }
})

export const {updateDelegatorState} = delegatorSlice.actions;

export const delegators = state => state.delegator.delegators;

export default delegatorSlice.reducer;