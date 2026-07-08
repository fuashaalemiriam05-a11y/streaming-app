import { catalogService } from './service.js';
export const catalogController = {
    list: async (_req, res) => {
        const result = await catalogService.list();
        res.json({ data: result, meta: {}, error: null });
    },
    getById: async (req, res) => {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        const result = await catalogService.getById(id);
        res.json({ data: result, meta: {}, error: null });
    },
};
