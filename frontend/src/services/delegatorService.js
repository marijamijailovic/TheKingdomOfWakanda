import axios from "axios";
import { REST_METHOD, CONFIG } from "./config";
import { createOKResponse, createErrorResponse } from "./responses";
import { globalConstants } from "../constants/global"

export async function addDelegator(delegatorAddress) {
    try {
        const response = await axios({
            method: REST_METHOD.POST,
            headers: {
                "Content-Type": "application/json"
            },
            url: `${CONFIG.URL}/addDelegators`,
            data: {delegatorAddress}
        });
        return createOKResponse(response.status,  response.data);
    } catch(error) {
        return createErrorResponse(error, globalConstants.FAILED_ADDING_DELEGATOR);
    }
}

export async function getDelegators() {
    try {
        const response = await axios({
            method: REST_METHOD.GET,
            headers: {
                "Content-Type": "application/json"
            },
            url: `${CONFIG.URL}/getDelegators`,
        });
        return createOKResponse(response.status,  response.data);
    } catch(error) {
        return createErrorResponse(error, globalConstants.FAILED_GETING_DELEGATORS);
    }
}
