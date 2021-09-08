import axios from "axios";
import { CONFIG, REST_METHOD } from "./config";
import { createOKResponse, createErrorResponse } from "./responses";
import { globalConstants } from "../constants/global"

export async function addWakanda(wakandaAddress) {
    try {
        const response = await axios({
            method: REST_METHOD.POST,
            headers: {
                "Content-Type": "application/json"
            },
            url: `${CONFIG.URL}/registration`,
            data: {wakandaAddress}
        });
        return createOKResponse(response.status,  response.data);
    } catch (error){
        return createErrorResponse(error, globalConstants.FAILED_REGISTRATION);
    }
}

export async function getWakandaStatus(wakandaAddress) {
    try {
        const response = await axios({
            method: REST_METHOD.GET,
            headers: {
                "Content-Type": "application/json"
            },
            url: `${CONFIG.URL}/getWakandaStatus?wakandaAddress=${wakandaAddress}`
        });
        return createOKResponse(response.status,  response.data);
    } catch (error){
        return createErrorResponse(error, globalConstants.FAILED_GETING_BALANCE);
    }
}