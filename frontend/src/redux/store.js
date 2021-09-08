import { configureStore } from "@reduxjs/toolkit";
import metamaskReducer from "./slices/metamaskSlice";
import candidatesReducer from "./slices/candidatesSlice";
import delegatorReducer from "./slices/delegatorSlice";
import votingReducer  from "./slices/votingSlice";
import wakandaReducer from "./slices/wakandaSlice";

export const store = configureStore({
  reducer: {
    metamask: metamaskReducer,
    candidates: candidatesReducer,
    delegator: delegatorReducer,
    voting: votingReducer,
    wakanda: wakandaReducer
  },
})