const createResponse = (res, statusCode, status, result) => {
    res.status(statusCode).json({"status": status, result});
}

module.exports = {
    createResponse,
}