import { Router } from 'express';
import { billingController } from './controller.js';

export const billingRoutes = Router();

billingRoutes.get('/plans', billingController.listPlans);
billingRoutes.post('/checkout', billingController.createCheckoutSession);
billingRoutes.post('/ppv', billingController.payPerView);
billingRoutes.post('/webhook', billingController.handleWebhook);
