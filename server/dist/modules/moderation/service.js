export const moderationService = {
    listReports: async () => [{ id: 'report-1', reason: 'spam', status: 'open' }],
    createReport: async () => ({ id: 'report-1', reason: 'spam', status: 'open' }),
};
