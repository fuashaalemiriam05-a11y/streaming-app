import { z } from 'zod';

export const NOTIFICATION_LIST_QUERY_SCHEMA = z.object({
  unreadOnly: z.coerce.boolean().optional(),
});
