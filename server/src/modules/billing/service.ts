import crypto from 'crypto';
import { AppError } from '../../middleware/errorHandler.js';
import { formatBillingResponse } from './view.js';

const PLANS = [
  { id: 'basic', name: 'Basic', priceCents: 0, interval: 'free' },
  { id: 'pro', name: 'Pro', priceCents: 1299, interval: 'monthly' },
  { id: 'creator', name: 'Creator', priceCents: 4999, interval: 'monthly' },
];

type CheckoutInput = {
  planId: string;
  userId?: string;
  amountCents?: number;
};

type WebhookPayload = {
  event: string;
  transactionId: string;
  status: string;
  amountCents?: number;
  planId?: string;
};

function buildReference(planId: string, userId?: string) {
  return `${planId}-${userId || 'anonymous'}-${Date.now()}`;
}

function buildCheckoutUrl(reference: string, amountCents: number) {
  const secret = process.env.FLUTTERWAVE_SECRET || 'flutterwave-dev';
  const signature = crypto.createHmac('sha256', secret).update(reference).digest('hex');
  return `https://checkout.flutterwave.com/pay/${reference}?sig=${signature}&amount=${amountCents}`;
}

export const billingService = {
  listPlans: async () => formatBillingResponse(PLANS),

  createCheckoutSession: async (input: CheckoutInput) => {
    const plan = PLANS.find((item) => item.id === input.planId);
    if (!plan) {
      throw new AppError('Unknown plan', 404);
    }

    const amountCents = input.amountCents ?? plan.priceCents;
    const reference = buildReference(plan.id, input.userId);
    return formatBillingResponse({
      checkoutUrl: buildCheckoutUrl(reference, amountCents),
      reference,
      amountCents,
      planId: plan.id,
      status: 'PENDING',
    });
  },

  payPerView: async (input: { userId?: string; videoId: string; amountCents?: number }) => {
    const amountCents = input.amountCents ?? 199;
    const reference = buildReference(`ppv-${input.videoId}`, input.userId);
    return formatBillingResponse({
      reference,
      amountCents,
      videoId: input.videoId,
      status: 'PENDING',
      checkoutUrl: buildCheckoutUrl(reference, amountCents),
    });
  },

  processWebhook: async (payload: WebhookPayload) => {
    if (!payload?.transactionId || !payload?.event) {
      throw new AppError('Invalid webhook payload', 400);
    }

    return formatBillingResponse({
      transactionId: payload.transactionId,
      status: payload.status || 'SUCCESSFUL',
      event: payload.event,
      planId: payload.planId,
      processed: true,
    });
  },
};
