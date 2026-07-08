import { z } from 'zod';

export const CATALOG_QUERY_SCHEMA = z.object({
  page: z.coerce.number().int().positive().optional(),
});
