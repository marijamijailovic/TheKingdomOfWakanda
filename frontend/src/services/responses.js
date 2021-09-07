export function createOKResponse(statusCode, data) {
    if (data.responseCode && data.responseCode !== 200) {
      return createErrorResponse(data.responseCode, data.message);
    }
    return {
      OK: true,
      StatusCode: 200,
      Data: data,
    };
  }
  
  export function createErrorResponse(errorCode, message) {
    return {
      OK: false,
      StatusCode: "",
      ErrorText: message,
      ErrorCode: errorCode,
    };
  }