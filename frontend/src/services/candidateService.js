import { REST_METHOD } from "./config";
import { isNull } from "../helpers/utils";
import { globalConstants } from "../constants/global"
import { callAndCheckResponse } from "./responses";

export const addCandidates = async(candidates) => {
    return callAndCheckResponse(
        `/addCandidates`,
        REST_METHOD.POST,
        globalConstants.FAILED_ADDING_CANIDATES,
        response => !isNull(response.data),
        {candidates}
    );
}

export const getCandidates = async() => {
    return callAndCheckResponse(
        `/getCandidates`,
        REST_METHOD.GET,
        globalConstants.FAILED_GETING_CANIDATES,
        response => !isNull(response.data)
    );
}

export async function getWinners() {
    return callAndCheckResponse(
        `/leaderboard`,
        REST_METHOD.GET,
        globalConstants.FAILED_GETING_LEADERBOARD,
        response => !isNull(response.data)
    );
}