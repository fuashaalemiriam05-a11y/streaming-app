import { z } from 'zod';
export const ANALYTICS_OVERVIEW_QUERY_SCHEMA = z.object({
    range: z.enum(['day', 'week', 'month']).optional(),
});
