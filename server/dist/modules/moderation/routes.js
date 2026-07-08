import { Router } from 'express';
import { moderationController } from './controller.js';
export const moderationRoutes = Router();
moderationRoutes.get('/reports', moderationController.listReports);
moderationRoutes.post('/reports', moderationController.createReport);
