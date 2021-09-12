import { createSlice } from "@reduxjs/toolkit"
import { wakandaRegistration, getWakandaStatus, getWakandaBalance} from "../thunks/wakandaThunks";

export const wakandaSlice = createSlice({
  name: "wakanda",
  initialState: {registration: [], status: [], balance: 0, loading: "idle"},
  reducers: {
    updateWakandaState: (state) =>{
      state.registration = [];
      state.status = [];
      state.balance = 0;
      state.loading = "idle";
    }
  },
  extraReducers: {
    [wakandaRegistration.fulfilled] : (state, action) => {
      state.registration = action.payload;
    },
    [getWakandaStatus.fulfilled] : (state, action) => {
      state.status = action.payload;
    },
    [getWakandaBalance.fulfilled] : (state, action) => {
      state.balance = action.payload;
    }
  }
})

export const {updateWakandaState} = wakandaSlice.actions;

export const registration = state => state.wakanda.registration;
export const status = state => state.wakanda.status;
export const balance = state => state.wakanda.balance;

export default wakandaSlice.reducer;