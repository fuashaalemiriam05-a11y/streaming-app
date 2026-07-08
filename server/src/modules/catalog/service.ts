export const catalogService = {
  list: async () => [{ id: 'video-1', title: 'Intro to StreamCM', description: 'Starter catalog item' }],
  getById: async (id: string) => ({ id, title: 'Intro to StreamCM', description: 'Starter catalog item' }),
};
