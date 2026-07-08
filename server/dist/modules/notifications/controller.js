import { notificationsService } from './service.js';
export const notificationsController = {
    list: async (_req, res) => {
        const result = await notificationsService.list();
        res.json({ data: result, meta: {}, error: null });
    },
};
