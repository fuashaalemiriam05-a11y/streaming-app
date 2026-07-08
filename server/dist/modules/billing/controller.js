import { billingService } from './service.js';
export const billingController = {
    listPlans: async (_req, res) => {
        const result = await billingService.listPlans();
        res.json({ data: result, meta: {}, error: null });
    },
    createCheckoutSession: async (_req, res) => {
        const result = await billingService.createCheckoutSession();
        res.status(201).json({ data: result, meta: {}, error: null });
    },
};
