import type { NextFunction, Request, Response } from 'express';
import { playbackService } from './service.js';
import { PLAYBACK_PROGRESS_SCHEMA, PLAYBACK_QUERY_SCHEMA } from './validators.js';

export const playbackController = {
  getPlaybackUrl: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const query = PLAYBACK_QUERY_SCHEMA.parse(req.query);
      const result = await playbackService.getPlaybackUrl(id, query.userId);
      res.json({ data: result, meta: {}, error: null });
    } catch (error) {
      next(error);
    }
  },

  updateProgress: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const payload = PLAYBACK_PROGRESS_SCHEMA.parse(req.body);
      const result = await playbackService.updateProgress(id, payload);
      res.json({ data: result, meta: {}, error: null });
    } catch (error) {
      next(error);
    }
  },
};
