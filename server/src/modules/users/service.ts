export const usersService = {
  list: async () => [{ id: '1', email: 'demo@streamcm.dev', role: 'viewer' }],
  getById: async (id: string) => ({ id, email: 'demo@streamcm.dev', role: 'viewer' }),
};
