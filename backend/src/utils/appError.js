
// customise the error
export class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true; // Important: Indicate that this is a known, expected error.
        Error.captureStackTrace(this, this.constructor);
    }
}
