import type { Request, Response, NextFunction } from 'express';
import { authService } from './service.js';
import { LOGIN_SCHEMA, REFRESH_TOKEN_SCHEMA, SIGNUP_SCHEMA, VERIFY_OTP_SCHEMA } from './validators.js';

export const authController = {
  signup: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = SIGNUP_SCHEMA.parse(req.body);
      const result = await authService.signup(payload);
      res.status(201).json({ data: result, meta: {}, error: null });
    } catch (error) {
      next(error);
    }
  },

  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = LOGIN_SCHEMA.parse(req.body);
      const result = await authService.login(payload);
      res.json({ data: result, meta: {}, error: null });
    } catch (error) {
      next(error);
    }
  },

  verifyOtp: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = VERIFY_OTP_SCHEMA.parse(req.body);
      const result = await authService.verifyOtp(payload);
      res.json({ data: result, meta: {}, error: null });
    } catch (error) {
      next(error);
    }
  },

  refreshToken: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = REFRESH_TOKEN_SCHEMA.parse(req.body);
      const result = await authService.refreshToken(payload);
      res.json({ data: result, meta: {}, error: null });
    } catch (error) {
      next(error);
    }
  },

  logout: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = REFRESH_TOKEN_SCHEMA.parse({ refreshToken: req.headers.authorization?.split(' ')[1] ?? '' });
      const result = await authService.logout({ accessToken: payload.refreshToken });
      res.json({ data: result, meta: {}, error: null });
    } catch (error) {
      next(error);
    }
  },
};
