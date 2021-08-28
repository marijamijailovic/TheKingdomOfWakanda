import { registrationConstants, globalConstants } from "../constants/global";

export const wakandaReducer = (
    state = {
        wakandaRegister: false, 
        wakandaAddress: "",
        data: null,
        error: ""
        }, 
        action = {}
    ) => {
    switch (action.type) {
        case registrationConstants.REGISTER_WAKANDA_REQUEST:
          return {
            ...state,
            wakandaRegister: false,
            wakandaAddress: "",
            data: null,
            error: ""
          };
        case registrationConstants.REGISTER_WAKANDA_SUCCESS:
          return {
            ...state,
            wakandaRegister: action.data.reason === globalConstants.ALREADY_VOTED ? false : true,
            wakandaAddress: action.wakandaAddress,
            data: action.data,
            error: ""
          };
        case registrationConstants.REGISTER_WAKANDA_FAILURE:
          return {
            ...state,
            wakandaRegister: false,
            wakandaAddress: "",
            data: null,
            error: action.error
          };
        default:
          return state;
      }
}