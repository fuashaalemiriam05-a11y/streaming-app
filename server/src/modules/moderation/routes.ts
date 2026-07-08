import { Router } from 'express';
import { roleGuard } from '../../middleware/roleGuard.js';
import { moderationController } from './controller.js';

export const moderationRoutes = Router();

moderationRoutes.use(roleGuard(['admin']));
moderationRoutes.get('/queue', moderationController.listQueue);
moderationRoutes.post('/flags', moderationController.flagContent);
moderationRoutes.post('/flags/:flagId/review', moderationController.reviewFlag);
