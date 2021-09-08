import * as delegatorService from "../../services/delegatorService";
import { delegatorRequest, delegatorSuccess, delegatorFailure } from "../slices/delegatorSlice";

export function addDelegator(delegatorAddress) {
    return async dispatch => {
      dispatch(delegatorRequest())
      try {
        const response = await delegatorService.addDelegator(delegatorAddress);
        if(response.OK) {
          dispatch(delegatorSuccess(response.Data));
        } else {
          dispatch(delegatorFailure(response.ErrorText));
        }
      } catch (error) {
        dispatch(delegatorFailure(error.message));
      }
    }
}

export function getDelegators() {
  return async dispatch => {
      dispatch(delegatorRequest())
      try {
      const response = await delegatorService.getDelegators();
      if(response.OK) {
          dispatch(delegatorSuccess(response.Data));
      } else {
          dispatch(delegatorFailure(response.ErrorText));
      }
      } catch (error) {
      dispatch(delegatorFailure(error.message));
      }
  }
}

