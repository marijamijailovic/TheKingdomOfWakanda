import axios from "axios";
import { REST_METHOD, CONFIG } from "./config";
import { createOKResponse, createErrorResponse } from "./responses";
import { globalConstants } from "../constants/global"

export async function getWinners() {
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

export async function getCandidates() {
    try {
        const response = await axios({
            method: REST_METHOD.GET,
            headers: {
                "Content-Type": "application/json"
            },
            url: `${CONFIG.URL}/getCandidates`,
        });
        return createOKResponse(response.status,  response.data);
    } catch(error) {
        return createErrorResponse(error, globalConstants.FAILED_GETING_CANIDATES);
    }
}