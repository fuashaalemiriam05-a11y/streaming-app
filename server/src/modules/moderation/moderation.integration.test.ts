import { beforeEach, describe, expect, it, vi } from 'vitest';
import request from 'supertest';
import express from 'express';
import { moderationRoutes } from './routes.js';
import { moderationService } from './service.js';

vi.mock('./service.js', () => ({
  moderationService: {
    listQueue: vi.fn(),
    flagContent: vi.fn(),
    reviewFlag: vi.fn(),
  },
}));

const app = express();
app.use(express.json());
app.use('/api/v1/moderation', moderationRoutes);

describe('moderation integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(moderationService.flagContent).mockResolvedValue({ id: 'flag-1', status: 'pending' });
    vi.mocked(moderationService.reviewFlag).mockResolvedValue({ id: 'flag-1', status: 'approved' });
  });

  it('flags content and reviews it', async () => {
    const flagResponse = await request(app)
      .post('/api/v1/moderation/flags')
      .set('x-role', 'admin')
      .send({ videoId: 'video-1', userId: 'user-1', reason: 'spam' });

    expect(flagResponse.status).toBe(201);
    expect(moderationService.flagContent).toHaveBeenCalled();

    const reviewResponse = await request(app)
      .post('/api/v1/moderation/flags/flag-1/review')
      .set('x-role', 'admin')
      .send({ action: 'approve', adminId: 'admin-1' });

    expect(reviewResponse.status).toBe(200);
    expect(moderationService.reviewFlag).toHaveBeenCalled();
  });
});
