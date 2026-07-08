import { Request, Response } from 'express';
import { usersService } from './service.js';

export const usersController = {
  list: async (_req: Request, res: Response) => {
    const result = await usersService.list();
    res.json({ data: result, meta: {}, error: null });
  },
  getById: async (req: Request, res: Response) => {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const result = await usersService.getById(id);
    res.json({ data: result, meta: {}, error: null });
  },
};
