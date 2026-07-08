import type { NextFunction, Request, Response } from 'express';
import { billingService } from './service.js';
import { CHECKOUT_SESSION_SCHEMA, WEBHOOK_PAYLOAD_SCHEMA } from './validators.js';

export const billingController = {
  listPlans: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await billingService.listPlans();
      res.json({ data: result, meta: {}, error: null });
    } catch (error) {
      next(error);
    }
  },

  createCheckoutSession: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = CHECKOUT_SESSION_SCHEMA.parse(req.body);
      const result = await billingService.createCheckoutSession(payload);
      res.status(201).json({ data: result, meta: {}, error: null });
    } catch (error) {
      next(error);
    }
  },

  payPerView: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await billingService.payPerView({
        userId: req.body.userId,
        videoId: req.body.videoId,
        amountCents: req.body.amountCents,
      });
      res.status(201).json({ data: result, meta: {}, error: null });
    } catch (error) {
      next(error);
    }
  },

  handleWebhook: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = WEBHOOK_PAYLOAD_SCHEMA.parse(req.body);
      const result = await billingService.processWebhook(payload);
      res.json({ data: result, meta: {}, error: null });
    } catch (error) {
      next(error);
    }
  },
};
