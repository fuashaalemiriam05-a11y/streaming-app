import { describe, expect, it, vi } from 'vitest';

const videoFindUniqueMock = vi.hoisted(() => vi.fn());
const eventCreateMock = vi.hoisted(() => vi.fn());
const watchUpsertMock = vi.hoisted(() => vi.fn());
const eventCountMock = vi.hoisted(() => vi.fn());
const watchAggregateMock = vi.hoisted(() => vi.fn());
const eventFindManyMock = vi.hoisted(() => vi.fn());

vi.mock('../../config/prisma.js', () => ({
  prisma: {
    video: { findUnique: videoFindUniqueMock },
    eventLog: {
      create: eventCreateMock,
      count: eventCountMock,
      findMany: eventFindManyMock,
    },
    watchHistory: {
      upsert: watchUpsertMock,
      aggregate: watchAggregateMock,
    },
  },
}));

import { analyticsService } from './service';

describe('analyticsService', () => {
  it('ingests playback events and reports aggregated metrics', async () => {
    videoFindUniqueMock.mockResolvedValue({ id: 'video-1' });
    eventCreateMock.mockResolvedValue({ id: 'event-1', eventType: 'play' });
    watchUpsertMock.mockResolvedValue({ id: 'history-1' });
    eventCountMock.mockResolvedValue(2);
    watchAggregateMock.mockResolvedValue({ _sum: { watchTimeSeconds: 180 } });
    eventFindManyMock.mockResolvedValue([{ id: 'event-1' }]);

    const event = await analyticsService.ingestEvent({ videoId: 'video-1', userId: 'user-1', eventType: 'play', watchTimeSeconds: 30 });
    const overview = await analyticsService.getOverview('week');
    const events = await analyticsService.getEvents();

    expect(event.eventType).toBe('play');
    expect(overview.totalViews).toBe(2);
    expect(overview.engagementRate).toBe(100);
    expect(events).toHaveLength(1);
  });
});
