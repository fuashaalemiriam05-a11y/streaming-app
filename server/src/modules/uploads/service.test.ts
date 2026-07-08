import { beforeEach, describe, expect, it, vi } from 'vitest';

const { createMock, queueAddMock } = vi.hoisted(() => ({
  createMock: vi.fn(),
  queueAddMock: vi.fn(),
}));

vi.mock('../../config/prisma.js', () => ({
  prisma: {
    video: {
      create: createMock,
    },
  },
}));

vi.mock('../../queues/transcoding.js', () => ({
  transcodingQueue: {
    add: queueAddMock,
  },
}));

import { uploadsService } from './service';

describe('uploadsService', () => {
  beforeEach(() => {
    createMock.mockReset();
    queueAddMock.mockReset();
    createMock.mockResolvedValue({ id: 'video-1' });
    queueAddMock.mockResolvedValue({});
  });

  it('creates a video record and queues transcode work', async () => {
    const result = await uploadsService.create({ title: 'demo', fileName: 'demo.mp4' });

    expect(createMock).toHaveBeenCalled();
    expect(queueAddMock).toHaveBeenCalled();
    expect(result.videoId).toBe('video-1');
  });
});
