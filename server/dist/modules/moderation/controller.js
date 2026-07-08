import { moderationService } from './service.js';
export const moderationController = {
    listReports: async (_req, res) => {
        const result = await moderationService.listReports();
        res.json({ data: result, meta: {}, error: null });
    },
    createReport: async (_req, res) => {
        const result = await moderationService.createReport();
        res.status(201).json({ data: result, meta: {}, error: null });
    },
};
