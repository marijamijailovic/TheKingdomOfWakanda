import { configureStore } from "@reduxjs/toolkit";
import connectedAccountReducer from "./slices/connectedAccountSlice";
import candidatesReducer from "./slices/candidatesSlice";
import delegatorReducer from "./slices/delegatorSlice";
import votingReducer  from "./slices/votingSlice";
import wakandaReducer from "./slices/wakandaSlice";

export const store = configureStore({
  reducer: {
    connectedAccount: connectedAccountReducer,
    candidates: candidatesReducer,
    delegator: delegatorReducer,
    voting: votingReducer,
    wakanda: wakandaReducer
  },
})