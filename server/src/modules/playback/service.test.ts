import { beforeEach, describe, expect, it, vi } from 'vitest';

const getMock = vi.hoisted(() => vi.fn());
const setMock = vi.hoisted(() => vi.fn());

vi.mock('../../lib/redis.js', () => ({
  redis: {
    get: getMock,
    set: setMock,
  },
}));

import { playbackService } from './service';

describe('playbackService', () => {
  beforeEach(() => {
    getMock.mockReset();
    setMock.mockReset();
    getMock.mockResolvedValue(null);
    setMock.mockResolvedValue('OK');
  });

  it('returns a signed manifest URL and resume position when available', async () => {
    getMock.mockResolvedValue(JSON.stringify({ position: 125 }));

    const result = await playbackService.getPlaybackUrl('video-1', 'user-1');

    expect(result.manifestUrl).toContain('playlist.m3u8');
    expect(result.resumePosition).toBe(125);
    expect(result.qualities).toContain('720p');
  });

  it('stores progress for a playback session', async () => {
    const result = await playbackService.updateProgress('video-1', { userId: 'user-1', position: 240, duration: 600 });

    expect(setMock).toHaveBeenCalled();
    expect(result.historySaved).toBe(true);
    expect(result.resumePosition).toBe(240);
  });
});
