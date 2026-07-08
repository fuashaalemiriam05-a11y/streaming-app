import { Router } from 'express';
import { authController } from './controller.js';
export const authRoutes = Router();
authRoutes.post('/login', authController.login);
authRoutes.post('/register', authController.register);
