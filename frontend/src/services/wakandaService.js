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
        globalConstants.FAILED_GETING_WAKANDA,
        response => !isNull(response.data),
    );
}

export async function getWakandaBalance(wakandaAddress) {
    return callAndCheckResponse(
        `/getWakandaBalance?wakandaAddress=${wakandaAddress}`,
        REST_METHOD.GET,
        globalConstants.FAILED_GETING_WAKANDA_BALANCE,
        response => !isNull(response.data),
    );
}