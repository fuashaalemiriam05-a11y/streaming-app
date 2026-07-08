export const authService = {
    login: async () => ({ token: 'placeholder-token', user: { id: '1', email: 'demo@streamcm.dev', role: 'viewer' } }),
    register: async () => ({ id: '1', email: 'demo@streamcm.dev', role: 'viewer' }),
};
