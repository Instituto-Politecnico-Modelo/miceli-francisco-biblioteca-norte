const Messages = require("../enums/Messages.js");
const ApiResponse = require("../responses/ApiResponse.js");

function notFoundHandler(req, res) {
    return ApiResponse.error(res, Messages.ROUTE_NOT_FOUND, 404);
}

module.exports = notFoundHandler;
