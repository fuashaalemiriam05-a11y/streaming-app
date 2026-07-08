import { describe, expect, it, vi } from 'vitest';

const findManyMock = vi.hoisted(() => vi.fn());
const createMock = vi.hoisted(() => vi.fn());
const findUniqueMock = vi.hoisted(() => vi.fn());
const updateMock = vi.hoisted(() => vi.fn());
const videoFindUniqueMock = vi.hoisted(() => vi.fn());
const videoUpdateMock = vi.hoisted(() => vi.fn());

vi.mock('../../config/prisma.js', () => ({
  prisma: {
    moderationFlag: {
      findMany: findManyMock,
      create: createMock,
      findUnique: findUniqueMock,
      update: updateMock,
    },
    video: {
      findUnique: videoFindUniqueMock,
      update: videoUpdateMock,
    },
  },
}));

import { moderationService } from './service';

describe('moderationService', () => {
  it('lists pending moderation flags', async () => {
    findManyMock.mockResolvedValue([{ id: 'flag-1', status: 'pending' }]);

    const result = await moderationService.listQueue();
    expect(result).toHaveLength(1);
  });

  it('flags content and updates its status on review', async () => {
    videoFindUniqueMock.mockResolvedValue({ id: 'video-1' });
    createMock.mockResolvedValue({ id: 'flag-1', status: 'pending' });
    findUniqueMock.mockResolvedValue({ id: 'flag-1', videoId: 'video-1' });
    updateMock.mockResolvedValue({ id: 'flag-1', status: 'approved' });
    videoUpdateMock.mockResolvedValue({ id: 'video-1' });

    const created = await moderationService.flagContent({ videoId: 'video-1', userId: 'user-1', reason: 'spam' });
    const reviewed = await moderationService.reviewFlag('flag-1', 'approve', 'admin-1');

    expect(created.status).toBe('pending');
    expect(reviewed.status).toBe('approved');
  });
});
