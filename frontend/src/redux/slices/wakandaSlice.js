import { createSlice } from "@reduxjs/toolkit"
import { wakandaRegistration, getWakandaStatus} from "../thunks/wakandaThunks";

export const wakandaSlice = createSlice({
  name: "wakanda",
  initialState: {registration: [], status: [], loading: "idle"},
  reducers: {
    updateState: (state) =>{
      state.registration = [];
      state.status = [];
      state.loading = "idle";
    }
  },
  extraReducers: {
    [wakandaRegistration.fulfilled] : (state, action) => {
      state.registration = action.payload;
    },
    [getWakandaStatus.fulfilled] : (state, action) => {
      state.status = action.payload;
    }
  }
})

export const {updateState} = wakandaSlice.actions;

export const registration = state => state.wakanda.registration;
export const status = state => state.wakanda.status;

export default wakandaSlice.reducer;