import { z } from 'zod';
export const UPLOAD_CREATE_SCHEMA = z.object({
    title: z.string().min(1),
    fileName: z.string().min(1),
});
