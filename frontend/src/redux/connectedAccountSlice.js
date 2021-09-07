import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  account: "",
}

export const connectedAccountSlice = createSlice({
  name: "connectedAccount",
  initialState,
  reducers: {
    connectAccount: (state, action) => {
      state.account = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { connectAccount } = connectedAccountSlice.actions;

export default connectedAccountSlice.reducer;