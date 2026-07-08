export class AppError extends Error {
    statusCode;
    constructor(message, statusCode = 500) {
        super(message);
        this.name = 'AppError';
        this.statusCode = statusCode;
    }
}
export function errorHandler(err, _req, res, _next) {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({ data: null, meta: {}, error: { message: err.message } });
    }
    return res.status(500).json({ data: null, meta: {}, error: { message: 'Internal server error' } });
}
