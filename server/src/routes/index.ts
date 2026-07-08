import { Router } from 'express';
import { authRoutes } from '../modules/auth/routes.js';
import { usersRoutes } from '../modules/users/routes.js';
import { catalogRoutes } from '../modules/catalog/routes.js';
import { uploadsRoutes } from '../modules/uploads/routes.js';
import { playbackRoutes } from '../modules/playback/routes.js';
import { billingRoutes } from '../modules/billing/routes.js';
import { notificationsRoutes } from '../modules/notifications/routes.js';
import { moderationRoutes } from '../modules/moderation/routes.js';
import { analyticsRoutes } from '../modules/analytics/routes.js';

export const router = Router();

router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/catalog', catalogRoutes);
router.use('/uploads', uploadsRoutes);
router.use('/playback', playbackRoutes);
router.use('/billing', billingRoutes);
router.use('/notifications', notificationsRoutes);
router.use('/moderation', moderationRoutes);
router.use('/analytics', analyticsRoutes);
