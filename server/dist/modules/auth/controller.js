import { authService } from './service.js';
export const authController = {
    login: async (_req, res) => {
        const result = await authService.login();
        res.json({ data: result, meta: {}, error: null });
    },
    register: async (_req, res) => {
        const result = await authService.register();
        res.status(201).json({ data: result, meta: {}, error: null });
    },
};
