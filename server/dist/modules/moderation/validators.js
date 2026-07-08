import { z } from 'zod';
export const REPORT_CREATE_SCHEMA = z.object({
    videoId: z.string().min(1),
    reason: z.string().min(1),
});
