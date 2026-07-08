import { z } from 'zod';
export const LOGIN_SCHEMA = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});
export const REGISTER_SCHEMA = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string().min(2).optional(),
});
