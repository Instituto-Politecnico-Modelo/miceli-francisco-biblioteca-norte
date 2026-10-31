const { BadRequestError } = require("../exceptions/AppError.js");
const Messages = require("../enums/Messages.js");

function parseId(rawId) {
    const id = Number(rawId);
    if (!Number.isInteger(id)) {
        throw new BadRequestError(Messages.INVALID_DATA);
    }
    return id;
}

module.exports = parseId;
