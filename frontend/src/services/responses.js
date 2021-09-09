import axios from "axios";
import { CONFIG } from "./config";
import { isValid } from "../helpers/utils";
import { isString } from "underscore";

export const callAndCheckResponse = async (url, method, errorMessage, validator, data) => {
	try {
		const response = await axios({
			method: method,
			headers: {
				"Content-Type": "application/json"
			},
			url: `${CONFIG.URL}${url}`,
			data
		});
		const validResponse = validator(response);
		return validResponse ? 
            createOKResponse(response.status, response.data)
			: 
            createErrorResponse({ message: errorMessage }, errorMessage);
	} catch (error) {
		return createErrorResponse(error, errorMessage);
	}
};

const createOKResponse = (statusCode, data) => {
  if (data.responseCode && data.responseCode !== 200) {
    return createErrorResponse(data.responseCode, data.message);
  }
  return {
    OK: true,
    StatusCode: 200,
    Data: createResponseData(data),
  };
}

const createResponseData = (data) => {
  return {
    response: isValid(data, data.response) && data.response, 
    reason: isValid(data, data.reason) && data.reason, 
    error: isString(data) ? data : ""
  }
}
  
const createErrorResponse = (errorCode, errorMessage) => {
  return {
    OK: false,
    StatusCode: errorCode.status,
    Error: createResponseData(errorMessage)
  };
}