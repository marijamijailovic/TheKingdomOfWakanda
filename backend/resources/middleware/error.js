const response = require("../../utils/response");
const constants = require("../../constants");

const errorHandler = (err, req, res, next) =>{
    console.error(err);
    response.createResponse(res, 500, constants.RESPONSE_STATUS.FAILED, err.message);
}

module.exports = {errorHandler}