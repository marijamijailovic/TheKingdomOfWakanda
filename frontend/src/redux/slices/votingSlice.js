import { createSlice } from "@reduxjs/toolkit"
import { initialState } from "../state";
import { request, success, failure} from "../actions/actionsType";

export const votingSlice = createSlice({
  name: "voting",
  initialState,
  reducers: {
    voteRequest: request,
    voteSuccess: success,
    voteFailure: failure,
  },
})

export const { voteRequest, voteSuccess, voteFailure } = votingSlice.actions;

export const votingLoading = state => state.voting.loading;
export const votingHasErrors = state => state.voting.hasErrors;
export const votingData = state => state.voting.data;
export const votingError = state => state.voting.error;

export default votingSlice.reducer;
