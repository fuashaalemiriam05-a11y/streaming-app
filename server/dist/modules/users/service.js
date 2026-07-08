export const usersService = {
    list: async () => [{ id: '1', email: 'demo@streamcm.dev', role: 'viewer' }],
    getById: async (id) => ({ id, email: 'demo@streamcm.dev', role: 'viewer' }),
};
