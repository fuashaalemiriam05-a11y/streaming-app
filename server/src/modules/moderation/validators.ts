import { z } from 'zod';

export const FLAG_CONTENT_SCHEMA = z.object({
  videoId: z.string().min(1),
  userId: z.string().optional(),
  reason: z.string().min(1),
  notes: z.string().optional(),
});

export const REVIEW_FLAG_SCHEMA = z.object({
  action: z.enum(['approve', 'reject']),
  adminId: z.string().optional(),
});
