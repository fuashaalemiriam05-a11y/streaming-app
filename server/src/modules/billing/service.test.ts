import { describe, expect, it } from 'vitest';
import { billingService } from './service';

describe('billingService', () => {
  it('lists available billing plans', async () => {
    const plans = await billingService.listPlans();
    expect(plans).toHaveLength(3);
    expect(plans[1]).toMatchObject({ id: 'pro' });
  });

  it('creates a checkout session for a selected plan', async () => {
    const result = await billingService.createCheckoutSession({ planId: 'pro', userId: 'user-1' });
    expect(result.checkoutUrl).toContain('checkout.flutterwave.com');
    expect(result.status).toBe('PENDING');
  });

  it('processes a webhook payload', async () => {
    const result = await billingService.processWebhook({ event: 'charge.completed', transactionId: 'txn-1', status: 'SUCCESSFUL', planId: 'pro' });
    expect(result.processed).toBe(true);
    expect(result.status).toBe('SUCCESSFUL');
  });
});
