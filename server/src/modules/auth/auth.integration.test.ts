import { beforeEach, describe, expect, it, vi } from 'vitest';
import request from 'supertest';
import express from 'express';
import { authRoutes } from './routes.js';
import { authService } from './service.js';

vi.mock('./service.js', () => ({
  authService: {
    signup: vi.fn(),
    login: vi.fn(),
    verifyOtp: vi.fn(),
    refreshToken: vi.fn(),
    logout: vi.fn(),
  },
}));

const app = express();
app.use(express.json());
app.use('/api/v1/auth', authRoutes);

describe('auth integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(authService.signup).mockResolvedValue({ user: { email: 'demo@example.com' } });
  });

  it('accepts signup requests', async () => {
    const response = await request(app).post('/api/v1/auth/signup').send({
      email: 'demo@example.com',
      password: 'password123',
      name: 'Demo',
    });

    expect(response.status).toBe(201);
    expect(authService.signup).toHaveBeenCalled();
  });
});
