import { REST_METHOD } from "./config";
import { globalConstants } from "../constants/global"
import { callAndCheckResponse } from "./responses";
import { isNull } from "../helpers/utils";

export const addDelegator = async(delegatorAddress) => {
    return callAndCheckResponse(
        `/addDelegators`,
        REST_METHOD.POST,
        globalConstants.FAILED_ADDING_DELEGATOR,
        response => !isNull(response.data),
        {delegatorAddress}
    );
}

export async function getDelegators() {
    return callAndCheckResponse(
        `/getDelegators`,
        REST_METHOD.GET,
        globalConstants.FAILED_GETING_DELEGATORS,
        response => !isNull(response.data)
    );
}
