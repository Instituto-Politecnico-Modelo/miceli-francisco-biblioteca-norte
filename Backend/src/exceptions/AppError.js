class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

class BadRequestError extends AppError {
    constructor(message) {
        super(message, 400);
    }
}

class NotFoundError extends AppError {
    constructor(message) {
        super(message, 404);
    }
}

class ConflictError extends AppError {
    constructor(message) {
        super(message, 409);
    }
}

module.exports = AppError;
module.exports.AppError = AppError;
module.exports.BadRequestError = BadRequestError;
module.exports.NotFoundError = NotFoundError;
module.exports.ConflictError = ConflictError;
