import axios from "axios";
import { CONFIG } from "./config";

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
      createOKResponse(response.data)
			: 
      createErrorResponse({message : errorMessage}, errorMessage);
	} catch (error) {
		return createErrorResponse(error, errorMessage);
	}
};

export const createOKResponse = (data) => {
  return {
    OK: true,
    StatusCode: 200,
    Data: data,
  };
}
  
export const createErrorResponse = (errorCode, errorMessage) => {
  return {
    OK: false,
    StatusCode: errorCode ? errorCode.status : 500,
    Error: {error : errorMessage}
  };
}