import * as wakandaService from "../../services/wakandaService";
import { wakandaRequest, wakandaSuccess, wakandaFailure } from "../wakandaSlice";

export function wakandaRegistration(wakandaAddress) {
    return async dispatch => {
        dispatch(wakandaRequest())
        try {
        const response = await wakandaService.addWakanda(wakandaAddress);
        if(response.OK) {
            dispatch(wakandaSuccess(response.Data));
        } else {
            dispatch(wakandaFailure(response.ErrorText));
        }
        } catch (error) {
            dispatch(wakandaFailure(error.message));
        }
    }
}
  
// Asynchronous thunk action
export function getBalanceOf(wakandaAddress) {
    return async dispatch => {
        dispatch(wakandaRequest())
        try {
        const response = await wakandaService.getBalanceOf(wakandaAddress);
        if(response.OK) {
            dispatch(wakandaSuccess(response.Data));
        } else {
            dispatch(wakandaFailure(response.ErrorText));
        }
        } catch (error) {
        dispatch(wakandaFailure(error.message));
        }
    }
}