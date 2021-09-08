import { createSlice } from "@reduxjs/toolkit"
import {initialState} from "../state";
import { request, success, failure} from "../actions/actionsType";

export const delegatorSlice = createSlice({
  name: "delegator",
  initialState,
  reducers: {
    delegatorRequest: request,
    delegatorSuccess: success,
    delegatorFailure: failure,
  },
})

export const { delegatorRequest, delegatorSuccess, delegatorFailure } = delegatorSlice.actions;

export const delegatorLoading = state => state.delegator.loading;
export const delegatorHasErrors = state => state.delegator.hasErrors;
export const delegatorData = state => state.delegator.data;
export const delegatorError = state => state.delegator.error;

export default delegatorSlice.reducer;