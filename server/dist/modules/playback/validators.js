import { z } from 'zod';
export const PLAYBACK_QUERY_SCHEMA = z.object({
    token: z.string().optional(),
});
