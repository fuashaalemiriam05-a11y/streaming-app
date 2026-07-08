import type { NextFunction, Request, Response } from 'express';
import { analyticsService } from './service.js';
import { ANALYTICS_EVENT_SCHEMA, ANALYTICS_OVERVIEW_QUERY_SCHEMA } from './validators.js';

export const analyticsController = {
  ingestEvent: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = ANALYTICS_EVENT_SCHEMA.parse(req.body);
      const result = await analyticsService.ingestEvent(payload);
      res.status(201).json({ data: result, meta: {}, error: null });
    } catch (error) {
      next(error);
    }
  },

  getOverview: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = ANALYTICS_OVERVIEW_QUERY_SCHEMA.parse(req.query);
      const result = await analyticsService.getOverview(query.range);
      res.json({ data: result, meta: {}, error: null });
    } catch (error) {
      next(error);
    }
  },

  getEvents: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await analyticsService.getEvents();
      res.json({ data: result, meta: {}, error: null });
    } catch (error) {
      next(error);
    }
  },
};
