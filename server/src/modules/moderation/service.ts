import { prisma } from '../../config/prisma.js';
import { AppError } from '../../middleware/errorHandler.js';
import { formatModerationResponse } from './view.js';

type ReviewAction = 'approve' | 'reject';

type ModerateInput = {
  videoId: string;
  userId?: string;
  reason: string;
  notes?: string;
};

export const moderationService = {
  listQueue: async () => {
    const flags = await prisma.moderationFlag.findMany({
      orderBy: { createdAt: 'desc' },
      include: { video: true, reporter: true },
    });

    return formatModerationResponse(flags);
  },

  flagContent: async (input: ModerateInput) => {
    const video = await prisma.video.findUnique({ where: { id: input.videoId } });
    if (!video) {
      throw new AppError('Video not found', 404);
    }

    const flag = await prisma.moderationFlag.create({
      data: {
        videoId: input.videoId,
        reporterId: input.userId ?? 'system',
        reason: input.reason,
        notes: input.notes ?? '',
        status: 'pending',
      },
      include: { video: true, reporter: true },
    });

    return formatModerationResponse(flag);
  },

  reviewFlag: async (flagId: string, action: ReviewAction, adminId?: string) => {
    const flag = await prisma.moderationFlag.findUnique({ where: { id: flagId } });
    if (!flag) {
      throw new AppError('Flag not found', 404);
    }

    const nextStatus = action === 'approve' ? 'approved' : 'rejected';
    const updatedFlag = await prisma.moderationFlag.update({
      where: { id: flagId },
      data: {
        status: nextStatus,
        reviewedById: adminId ?? 'admin',
        reviewedAt: new Date(),
      },
      include: { video: true, reporter: true },
    });

    if (action === 'approve') {
      await prisma.video.update({ where: { id: flag.videoId }, data: { status: 'approved' } });
    } else {
      await prisma.video.update({ where: { id: flag.videoId }, data: { status: 'rejected' } });
    }

    return formatModerationResponse(updatedFlag);
  },
};
