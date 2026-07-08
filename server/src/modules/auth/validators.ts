import { z } from 'zod';

export const SIGNUP_SCHEMA = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2).optional(),
});

export const LOGIN_SCHEMA = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const VERIFY_OTP_SCHEMA = z.object({
  userId: z.string().min(1),
  otp: z.string().length(6),
});

export const REFRESH_TOKEN_SCHEMA = z.object({
  refreshToken: z.string().min(1),
});
