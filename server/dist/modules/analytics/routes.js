import { Router } from 'express';
import { analyticsController } from './controller.js';
export const analyticsRoutes = Router();
analyticsRoutes.get('/overview', analyticsController.getOverview);
