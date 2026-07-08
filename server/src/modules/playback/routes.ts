import { Router } from 'express';
import { playbackController } from './controller.js';

export const playbackRoutes = Router();

playbackRoutes.get('/:id', playbackController.getPlaybackUrl);
playbackRoutes.post('/:id/progress', playbackController.updateProgress);
