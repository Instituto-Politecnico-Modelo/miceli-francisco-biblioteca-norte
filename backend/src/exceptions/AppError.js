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

class UnauthorizedError extends AppError {
    constructor(message) {
        super(message, 401);
    }
}

class TooManyRequestsError extends AppError {
    constructor(message) {
        super(message, 429);
    }
}

module.exports = { AppError, BadRequestError, UnauthorizedError, NotFoundError, ConflictError, TooManyRequestsError };

