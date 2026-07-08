import type { NextFunction, Request, Response } from 'express';
import { AppError } from './errorHandler.js';

export function roleGuard(allowedRoles: string[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const user = (req as Request & { user?: { role?: string } }).user;
    const role = user?.role ?? (req.headers['x-role'] as string | undefined);

    if (!role || !allowedRoles.includes(role)) {
      return next(new AppError('Forbidden', 403));
    }

    next();
  };
}
