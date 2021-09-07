import axios from "axios";
import { CANDIDATES_LIST, REST_METHOD, CONFIG } from "./config";
import { createOKResponse, createErrorResponse } from "./responses";
import { globalConstants } from "../constants/global"

export async function addCandidates(candidates) {
    try {
        const response = await axios({
            method: REST_METHOD.POST,
            headers: {
                "Content-Type": "application/json"
            },
            url: `${CONFIG.URL}/addCandidates`,
            data: {candidates}
        });
        return createOKResponse(response.status,  response.data);
    } catch(error) {
        return createErrorResponse(error, globalConstants.FAILED_ADDING_CANIDATES);
    }
}

//These request is for admin page, to get candidates from https://wakanda.zmilos.com/list
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