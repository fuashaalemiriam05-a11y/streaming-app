import { Router } from 'express';
import { analyticsController } from './controller.js';

export const analyticsRoutes = Router();

analyticsRoutes.post('/events', analyticsController.ingestEvent);
analyticsRoutes.get('/overview', analyticsController.getOverview);
analyticsRoutes.get('/events', analyticsController.getEvents);
