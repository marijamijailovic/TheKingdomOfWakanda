import * as registrationService from "../services/registrationService";
import { registrationConstants } from '../constants/global';

export function registerWakanda(wakandaAddress) {
    return async (dispatch) => {
        dispatch(request());
        let response = await registrationService.addWakanda(wakandaAddress);
        if(response.OK) {
            dispatch(success(wakandaAddress, response.Data));
        } else {
            dispatch(failure(response.ErrorText));
        }
    };

    function request() {
        return { type: registrationConstants.REGISTER_WAKANDA_REQUEST };
    }
    function success(wakandaAddress, data) {
        return { type: registrationConstants.REGISTER_WAKANDA_SUCCESS, wakandaAddress, data };
    }
    function failure(error) {
        return { type: registrationConstants.REGISTER_WAKANDA_FAILURE, error };
    }
}