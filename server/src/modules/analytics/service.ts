import { prisma } from '../../config/prisma.js';
import { AppError } from '../../middleware/errorHandler.js';
import { formatAnalyticsResponse } from './view.js';

type EventType = 'play' | 'pause' | 'seek' | 'complete';

type AnalyticsEventInput = {
  videoId: string;
  userId?: string;
  eventType: EventType;
  watchTimeSeconds?: number;
  positionSeconds?: number;
  durationSeconds?: number;
};

export const analyticsService = {
  ingestEvent: async (input: AnalyticsEventInput) => {
    const video = await prisma.video.findUnique({ where: { id: input.videoId } });
    if (!video) {
      throw new AppError('Video not found', 404);
    }

    const event = await prisma.eventLog.create({
      data: {
        videoId: input.videoId,
        userId: input.userId ?? 'anonymous',
        eventType: input.eventType,
        watchTimeSeconds: input.watchTimeSeconds ?? 0,
        positionSeconds: input.positionSeconds ?? 0,
        durationSeconds: input.durationSeconds ?? 0,
      },
    });

    if (input.eventType === 'complete' || input.watchTimeSeconds) {
      await prisma.watchHistory.upsert({
        where: {
          userId_videoId: {
            userId: input.userId ?? 'anonymous',
            videoId: input.videoId,
          },
        },
        update: {
          watchTimeSeconds: input.watchTimeSeconds ?? 0,
          lastPositionSeconds: input.positionSeconds ?? 0,
          completed: input.eventType === 'complete',
        },
        create: {
          userId: input.userId ?? 'anonymous',
          videoId: input.videoId,
          watchTimeSeconds: input.watchTimeSeconds ?? 0,
          lastPositionSeconds: input.positionSeconds ?? 0,
          completed: input.eventType === 'complete',
        },
      });
    }

    return formatAnalyticsResponse(event);
  },

  getOverview: async (range: 'day' | 'week' | 'month' = 'week') => {
    const [totalViews, totalWatchTime, completedEvents] = await Promise.all([
      prisma.eventLog.count({ where: { eventType: 'play' } }),
      prisma.watchHistory.aggregate({ _sum: { watchTimeSeconds: true } }),
      prisma.eventLog.count({ where: { eventType: 'complete' } }),
    ]);

    const totalWatchTimeSeconds = totalWatchTime._sum.watchTimeSeconds ?? 0;
    const averageWatchTimeSeconds = totalViews > 0 ? totalWatchTimeSeconds / totalViews : 0;
    const engagementRate = totalViews > 0 ? (completedEvents / totalViews) * 100 : 0;

    return formatAnalyticsResponse({
      range,
      totalViews,
      averageWatchTimeSeconds,
      averageWatchTimeMinutes: averageWatchTimeSeconds / 60,
      engagementRate,
      completedEvents,
    });
  },

  getEvents: async () => {
    const events = await prisma.eventLog.findMany({ orderBy: { createdAt: 'desc' }, take: 20 });
    return formatAnalyticsResponse(events);
  },
};
