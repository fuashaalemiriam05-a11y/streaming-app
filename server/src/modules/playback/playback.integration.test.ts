import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '../../index.js';

describe('playback integration', () => {
  beforeAll(() => {
    process.env.NODE_ENV = 'test';
  });

  afterAll(() => {
    process.env.NODE_ENV = 'development';
  });

  it('returns a signed manifest URL and stores progress', async () => {
    const playbackResponse = await request(app).get('/api/v1/playback/video-1').query({ userId: 'user-1' });
    expect(playbackResponse.status).toBe(200);
    expect(playbackResponse.body.data.manifestUrl).toContain('playlist.m3u8');

    const progressResponse = await request(app).post('/api/v1/playback/video-1/progress').send({ userId: 'user-1', position: 320 });
    expect(progressResponse.status).toBe(200);
    expect(progressResponse.body.data.historySaved).toBe(true);
  });
});
