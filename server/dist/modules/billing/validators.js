import { z } from 'zod';
export const CHECKOUT_SESSION_SCHEMA = z.object({
    planId: z.string().min(1),
});
