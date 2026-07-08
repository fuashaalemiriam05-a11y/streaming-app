import { analyticsService } from './service.js';
export const analyticsController = {
    getOverview: async (_req, res) => {
        const result = await analyticsService.getOverview();
        res.json({ data: result, meta: {}, error: null });
    },
};
