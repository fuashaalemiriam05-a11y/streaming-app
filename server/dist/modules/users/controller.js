import { usersService } from './service.js';
export const usersController = {
    list: async (_req, res) => {
        const result = await usersService.list();
        res.json({ data: result, meta: {}, error: null });
    },
    getById: async (req, res) => {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        const result = await usersService.getById(id);
        res.json({ data: result, meta: {}, error: null });
    },
};
