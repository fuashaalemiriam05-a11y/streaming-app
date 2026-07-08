import crypto from 'crypto';
import { redis } from '../../lib/redis.js';
import { AppError } from '../../middleware/errorHandler.js';
import { formatPlaybackResponse } from './view.js';

const PLAYBACK_SECRET = process.env.PLAYBACK_SECRET || 'streamcm-playback-secret';
const RESUME_TTL = 60 * 60 * 24 * 30;

type PlaybackProgressInput = {
  userId?: string;
  position: number;
  duration?: number;
};

function createSignedManifestUrl(videoId: string) {
  const expiresAt = Date.now() + 60 * 60 * 1000;
  const signature = crypto.createHmac('sha256', PLAYBACK_SECRET).update(`${videoId}:${expiresAt}`).digest('hex');
  const params = new URLSearchParams({ token: signature, exp: String(expiresAt) });
  return `https://cdn.streamcm.dev/videos/${videoId}/playlist.m3u8?${params.toString()}`;
}

async function getResumePosition(userId: string, videoId: string) {
  const raw = await redis.get(`playback:${userId}:${videoId}`);
  if (!raw) {
    return null;
  }

  const parsed = JSON.parse(raw) as { position?: number };
  return parsed.position ?? null;
}

export const playbackService = {
  getPlaybackUrl: async (videoId: string, userId?: string) => {
    if (!videoId) {
      throw new AppError('Video ID is required', 400);
    }

    const resumePosition = userId ? await getResumePosition(userId, videoId) : null;
    return formatPlaybackResponse({
      videoId,
      manifestUrl: createSignedManifestUrl(videoId),
      resumePosition,
      qualities: ['360p', '720p', '1080p'],
    });
  },

  updateProgress: async (videoId: string, input: PlaybackProgressInput) => {
    if (!videoId) {
      throw new AppError('Video ID is required', 400);
    }

    if (typeof input.position !== 'number' || input.position < 0) {
      throw new AppError('Position must be a non-negative number', 400);
    }

    const userId = input.userId || 'anonymous';
    const payload = {
      position: input.position,
      duration: input.duration ?? input.position,
      updatedAt: new Date().toISOString(),
    };

    await redis.set(`playback:${userId}:${videoId}`, JSON.stringify(payload), 'EX', RESUME_TTL);

    return formatPlaybackResponse({
      videoId,
      resumePosition: input.position,
      historySaved: true,
    });
  },
};
