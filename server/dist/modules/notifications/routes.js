import { Router } from 'express';
import { notificationsController } from './controller.js';
export const notificationsRoutes = Router();
notificationsRoutes.get('/', notificationsController.list);
