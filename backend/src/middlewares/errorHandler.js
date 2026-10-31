const Messages = require("../enums/Messages.js");
const ApiResponse = require("../responses/ApiResponse.js");
const { AppError } = require("../exceptions/AppError.js");

function errorHandler(err, req, res, next) {
    if (err instanceof AppError) {
        return ApiResponse.error(res, err.message, err.statusCode);
    }
    console.error(err);
    return ApiResponse.error(res, Messages.INTERNAL_ERROR, 500);
}

module.exports = errorHandler;
