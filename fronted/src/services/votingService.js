import axios from "axios";
import { CANDIDATES_LIST, REST_METHOD, CONFIG } from "./config";
import { createOKResponse, createErrorResponse } from "./responses";
import { globalConstants } from "../constants/global"

export async function getCandidates() {
    try {
        const response = await axios({
            method: REST_METHOD.GET,
            headers: {
                "Content-Type": "application/json"
            },
            url: CANDIDATES_LIST.URL
        });
        return createOKResponse(response.status,  response.data);
    } catch(error) {
        return createErrorResponse(error, globalConstants.FAILED_GETING_CANIDATES);
    }
}

export async function vote(wakandaAddress, candidateId, candidate, amountOfVotes) {
    try {
        const response = await axios({
            method: REST_METHOD.POST,
            headers: {
                "Content-Type": "application/json"
            },
            url: `${CONFIG.URL}/vote`,
            data: {wakandaAddress, candidateId, candidate, amountOfVotes}
        });
        return createOKResponse(response.status,  response.data);
    } catch(error) {
        return createErrorResponse(error, globalConstants.FAILED_VOTING);
    }
}

export async function getLeaderboard() {
    try {
        const response = await axios({
            method: REST_METHOD.GET,
            headers: {
                "Content-Type": "application/json"
            },
            url: `${CONFIG.URL}/leaderboard`,
        });
        return createOKResponse(response.status,  response.data);
    } catch(error) {
        return createErrorResponse(error, globalConstants.FAILED_GETING_LEADERBOARD);
    }
}