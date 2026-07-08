import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';

export function validateRequest(schema: z.ZodTypeAny) {
  return (req: Request, _res: Response, next: NextFunction) => {
    schema.parse(req.body);
    next();
  };
}
