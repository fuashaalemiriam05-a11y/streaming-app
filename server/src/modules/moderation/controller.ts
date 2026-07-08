import type { NextFunction, Request, Response } from 'express';
import { moderationService } from './service.js';
import { FLAG_CONTENT_SCHEMA, REVIEW_FLAG_SCHEMA } from './validators.js';

export const moderationController = {
  listQueue: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await moderationService.listQueue();
      res.json({ data: result, meta: {}, error: null });
    } catch (error) {
      next(error);
    }
  },

  flagContent: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = FLAG_CONTENT_SCHEMA.parse(req.body);
      const result = await moderationService.flagContent(payload);
      res.status(201).json({ data: result, meta: {}, error: null });
    } catch (error) {
      next(error);
    }
  },

  reviewFlag: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = REVIEW_FLAG_SCHEMA.parse(req.body);
      const result = await moderationService.reviewFlag(req.params.flagId, payload.action, payload.adminId);
      res.json({ data: result, meta: {}, error: null });
    } catch (error) {
      next(error);
    }
  },
};
