import { describe, expect, it, vi, beforeEach } from 'vitest';
import { authService } from './service.js';
import { prisma } from '../../config/prisma.js';
import { redis } from '../../lib/redis.js';

vi.mock('../../config/prisma.js', () => ({ prisma: { user: { findUnique: vi.fn(), create: vi.fn() } } }));
vi.mock('../../lib/redis.js', () => ({ redis: { set: vi.fn(), get: vi.fn(), del: vi.fn() } }));

describe('authService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('signs up a new user and returns tokens', async () => {
    vi.mocked(prisma.user.findUnique).mockResolvedValue(null);
    vi.mocked(prisma.user.create).mockResolvedValue({
      id: 'user-1',
      email: 'demo@example.com',
      name: 'Demo',
      role: 'viewer',
      passwordHash: 'hashed',
      createdAt: new Date(),
      updatedAt: new Date(),
    } as never);
    vi.mocked(redis.set).mockResolvedValue('OK');

    const result = await authService.signup({ email: 'demo@example.com', password: 'password123', name: 'Demo' });

    expect(result).toMatchObject({ user: { email: 'demo@example.com' } });
    expect(prisma.user.create).toHaveBeenCalled();
  });
});
