import { createSlice } from "@reduxjs/toolkit"
import {initialState} from "./state";
import { request, success, failure} from "./actions/actionsType";

export const candidatesSlice = createSlice({
  name: "candidates",
  initialState,
  reducers: {
    candidatesRequest: request,
    candidatesSuccess: success,
    candidatesFailure: failure,
  },
})

// Action creators are generated for each case reducer function
export const { candidatesRequest, candidatesSuccess, candidatesFailure } = candidatesSlice.actions;

export const candidatesLoading = state => state.candidates.loading;
export const candidatesHasErrors = state => state.candidates.hasErrors;
export const candidatesData = state => state.candidates.data;
export const candidatesError = state => state.candidates.error;

export default candidatesSlice.reducer;