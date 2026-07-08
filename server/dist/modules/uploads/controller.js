import { uploadsService } from './service.js';
export const uploadsController = {
    create: async (_req, res) => {
        const result = await uploadsService.create();
        res.status(201).json({ data: result, meta: {}, error: null });
    },
};
