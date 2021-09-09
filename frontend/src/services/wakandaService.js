import { REST_METHOD } from "./config";
import { globalConstants } from "../constants/global";
import { callAndCheckResponse } from "./responses";
import { isNull } from "../helpers/utils";

export async function addWakanda(wakandaAddress) {
    return callAndCheckResponse(
        `/registration`,
        REST_METHOD.POST,
        globalConstants.FAILED_REGISTRATION,
        response => !isNull(response.data),
        {wakandaAddress}
    );
}

export async function getWakandaStatus(wakandaAddress) {
    return callAndCheckResponse(
        `/getWakandaStatus?wakandaAddress=${wakandaAddress}`,
        REST_METHOD.GET,
        globalConstants.FAILED_GETING_BALANCE,
        response => !isNull(response.data),
    );
}