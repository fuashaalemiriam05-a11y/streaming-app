import { NextFunction, Request, Response } from 'express';

export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode = 500) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
  }
}

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ data: null, meta: {}, error: { message: err.message } });
  }

  return res.status(500).json({ data: null, meta: {}, error: { message: 'Internal server error' } });
}
