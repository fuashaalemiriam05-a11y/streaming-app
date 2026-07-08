import { describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '../../index.js';

describe('billing integration', () => {
  it('handles webhook events via the billing API', async () => {
    const response = await request(app)
      .post('/api/v1/billing/webhook')
      .send({ event: 'charge.completed', transactionId: 'txn-1', status: 'SUCCESSFUL', planId: 'pro' });

    expect(response.status).toBe(200);
    expect(response.body.data.processed).toBe(true);
  });
});
