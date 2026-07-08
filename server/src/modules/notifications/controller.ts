import { Request, Response } from 'express';
import { notificationsService } from './service.js';

export const notificationsController = {
  list: async (_req: Request, res: Response) => {
    const result = await notificationsService.list();
    res.json({ data: result, meta: {}, error: null });
  },
};
