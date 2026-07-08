import { z } from 'zod';

export const ANALYTICS_EVENT_SCHEMA = z.object({
  videoId: z.string().min(1),
  userId: z.string().optional(),
  eventType: z.enum(['play', 'pause', 'seek', 'complete']),
  watchTimeSeconds: z.number().nonnegative().optional(),
  positionSeconds: z.number().nonnegative().optional(),
  durationSeconds: z.number().nonnegative().optional(),
});

export const ANALYTICS_OVERVIEW_QUERY_SCHEMA = z.object({
  range: z.enum(['day', 'week', 'month']).optional(),
});
