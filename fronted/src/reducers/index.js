import { wakandaReducer } from "./wakandaReducer";
import { votingReducer } from "./votingReducer";
import {leadersReducer} from "./leadersReducer";
import { combineReducers } from "redux";

const appReducer = combineReducers({wakandaReducer, votingReducer, leadersReducer});

const rootReducer = (state, action) => {
    return appReducer(state, action);
  };
  
  export default rootReducer;