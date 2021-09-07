import { createSlice } from "@reduxjs/toolkit"
import { initialState } from "./state";
import { request, success, failure} from "./actions/actionsType";

export const wakandaSlice = createSlice({
  name: "wakanda",
  initialState,
  reducers: {
    wakandaRequest: request,
    wakandaSuccess: success,
    wakandaFailure: failure,
  },
})

// Action creators are generated for each case reducer function
export const { wakandaRequest, wakandaSuccess, wakandaFailure } = wakandaSlice.actions;

export const wakandaLoading = state => state.wakanda.loading;
export const wakandaHasErrors = state => state.wakanda.hasErrors;
export const wakandaData = state => state.wakanda.data;
export const wakandaError = state => state.wakanda.error;

export default wakandaSlice.reducer;