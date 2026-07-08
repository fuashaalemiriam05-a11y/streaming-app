import { z } from 'zod';

export const CHECKOUT_SESSION_SCHEMA = z.object({
  planId: z.string().min(1),
  userId: z.string().optional(),
  amountCents: z.number().nonnegative().optional(),
});

export const WEBHOOK_PAYLOAD_SCHEMA = z.object({
  event: z.string().min(1),
  transactionId: z.string().min(1),
  status: z.string().optional(),
  amountCents: z.number().nonnegative().optional(),
  planId: z.string().optional(),
});
