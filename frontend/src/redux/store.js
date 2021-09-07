import { configureStore } from "@reduxjs/toolkit"
import connectedAccountReducer from "./connectedAccountSlice";
import candidatesReducer from "./candidatesSlice";
import votingReducer  from "./votingSlice";
import wakandaReducer from "./wakandaSlice";

export const store = configureStore({
  reducer: {
    connectedAccount: connectedAccountReducer,
    candidates: candidatesReducer,
    voting: votingReducer,
    wakanda: wakandaReducer
  },
})