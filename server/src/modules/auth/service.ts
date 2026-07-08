import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../../config/prisma.js';
import { redis } from '../../lib/redis.js';
import { AppError } from '../../middleware/errorHandler.js';
import { formatAuthResponse } from './view.js';
import type { AuthTokens } from './types.js';

const ACCESS_TOKEN_TTL = 15 * 60;
const REFRESH_TOKEN_TTL = 7 * 24 * 60 * 60;
const OTP_TTL = 5 * 60;

function signToken(payload: object, expiresIn: number) {
  const secret = process.env.JWT_SECRET || 'streamcm-dev-secret';
  return jwt.sign(payload, secret, { expiresIn } as jwt.SignOptions);
}

function verifyToken(token: string) {
  const secret = process.env.JWT_SECRET || 'streamcm-dev-secret';
  return jwt.verify(token, secret) as { sub: string; role?: string; type?: string };
}

async function storeToken(token: string, userId: string, ttl: number) {
  await redis.set(`auth:${token}`, userId, 'EX', ttl);
}

async function blacklistToken(token: string, ttl: number) {
  await redis.set(`blacklist:${token}`, '1', 'EX', ttl);
}

async function createOtp(userId: string) {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  await redis.set(`otp:${userId}`, otp, 'EX', OTP_TTL);
  return otp;
}

async function verifyOtp(userId: string, otp: string) {
  const cachedOtp = await redis.get(`otp:${userId}`);
  if (!cachedOtp || cachedOtp !== otp) {
    throw new AppError('Invalid OTP', 401);
  }
  await redis.del(`otp:${userId}`);
}

async function issueTokens(user: { id: string; role: string; email: string }): Promise<AuthTokens> {
  const accessToken = signToken({ sub: user.id, role: user.role }, ACCESS_TOKEN_TTL);
  const refreshToken = signToken({ sub: user.id, type: 'refresh' }, REFRESH_TOKEN_TTL);
  await storeToken(accessToken, user.id, ACCESS_TOKEN_TTL);
  await storeToken(refreshToken, user.id, REFRESH_TOKEN_TTL);
  return { accessToken, refreshToken };
}

export const authService = {
  signup: async (input: { email: string; password: string; name?: string }) => {
    const existingUser = await prisma.user.findUnique({ where: { email: input.email } });
    if (existingUser) {
      throw new AppError('Email already registered', 409);
    }

    const passwordHash = await bcrypt.hash(input.password, 10);
    const user = await prisma.user.create({
      data: {
        email: input.email,
        name: input.name,
        role: 'viewer',
        passwordHash,
      },
    });

    const otp = await createOtp(user.id);
    const tokens = await issueTokens({ id: user.id, role: user.role, email: user.email });

    return formatAuthResponse({
      user: { id: user.id, email: user.email, role: user.role, name: user.name },
      otp,
      tokens,
    });
  },

  login: async (input: { email: string; password: string }) => {
    const user = await prisma.user.findUnique({ where: { email: input.email } });
    if (!user?.passwordHash) {
      throw new AppError('Invalid credentials', 401);
    }

    const isPasswordValid = await bcrypt.compare(input.password, user.passwordHash);
    if (!isPasswordValid) {
      throw new AppError('Invalid credentials', 401);
    }

    const tokens = await issueTokens({ id: user.id, role: user.role, email: user.email });
    return formatAuthResponse({
      user: { id: user.id, email: user.email, role: user.role, name: user.name },
      tokens,
    });
  },

  verifyOtp: async (input: { userId: string; otp: string }) => {
    await verifyOtp(input.userId, input.otp);
    return formatAuthResponse({ success: true });
  },

  refreshToken: async (input: { refreshToken: string }) => {
    const decoded = verifyToken(input.refreshToken) as { sub: string; type?: string };
    if (decoded.type !== 'refresh') {
      throw new AppError('Invalid refresh token', 401);
    }

    const user = await prisma.user.findUnique({ where: { id: decoded.sub } });
    if (!user) {
      throw new AppError('User not found', 404);
    }

    const tokens = await issueTokens({ id: user.id, role: user.role, email: user.email });
    return formatAuthResponse({
      user: { id: user.id, email: user.email, role: user.role, name: user.name },
      tokens,
    });
  },

  logout: async (input: { accessToken: string }) => {
    const decoded = verifyToken(input.accessToken);
    await blacklistToken(input.accessToken, ACCESS_TOKEN_TTL);
    await redis.del(`auth:${input.accessToken}`);
    return formatAuthResponse({ success: true, userId: decoded.sub });
  },
};
