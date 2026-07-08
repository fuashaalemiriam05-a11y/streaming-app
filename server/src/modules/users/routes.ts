import { Router } from 'express';
import { usersController } from './controller.js';

export const usersRoutes = Router();

usersRoutes.get('/', usersController.list);
usersRoutes.get('/:id', usersController.getById);
