import { Request, Response } from 'express';
import { catalogService } from './service.js';

export const catalogController = {
  list: async (_req: Request, res: Response) => {
    const result = await catalogService.list();
    res.json({ data: result, meta: {}, error: null });
  },
  getById: async (req: Request, res: Response) => {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const result = await catalogService.getById(id);
    res.json({ data: result, meta: {}, error: null });
  },
};
