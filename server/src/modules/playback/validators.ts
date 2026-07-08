import { z } from 'zod';

export const PLAYBACK_QUERY_SCHEMA = z.object({
  token: z.string().optional(),
  userId: z.string().optional(),
});

export const PLAYBACK_PROGRESS_SCHEMA = z.object({
  userId: z.string().optional(),
  position: z.number().nonnegative(),
  duration: z.number().nonnegative().optional(),
});
