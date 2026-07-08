import Redis from 'ioredis';

function createRedisClient() {
  if (process.env.NODE_ENV === 'test') {
    return {
      get: async () => null,
      set: async () => 'OK',
      del: async () => 1,
    } as Pick<Redis, 'get' | 'set' | 'del'>;
  }

  return new Redis(process.env.REDIS_URL || 'redis://localhost:6379');
}

export const redis = createRedisClient();
