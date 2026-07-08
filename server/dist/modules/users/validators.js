import { z } from 'zod';
export const USER_LIST_QUERY_SCHEMA = z.object({
    page: z.coerce.number().int().positive().optional(),
});
