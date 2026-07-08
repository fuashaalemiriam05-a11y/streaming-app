import { Router } from 'express';
import { uploadsController } from './controller.js';
export const uploadsRoutes = Router();
uploadsRoutes.post('/', uploadsController.create);
