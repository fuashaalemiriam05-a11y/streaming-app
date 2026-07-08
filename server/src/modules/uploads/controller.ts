import type { NextFunction, Request, Response } from 'express';
import { uploadsService } from './service.js';
import { UPLOAD_CREATE_SCHEMA } from './validators.js';

export const uploadsController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = UPLOAD_CREATE_SCHEMA.parse(req.body);
      const result = await uploadsService.create(payload);
      res.status(201).json({ data: result, meta: {}, error: null });
    } catch (error) {
      next(error);
    }
  },

  processChunk: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const uploadId = req.params.uploadId;
      const result = await uploadsService.processChunk(uploadId, req.body as Buffer);
      res.json({ data: result, meta: {}, error: null });
    } catch (error) {
      next(error);
    }
  },
};
