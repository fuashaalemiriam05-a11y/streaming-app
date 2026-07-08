import { axiosClient } from '../axiosClient';

export async function signup(payload: { email: string; password: string; name?: string }) {
  return axiosClient.post('/auth/signup', payload);
}

export async function login(payload: { email: string; password: string }) {
  return axiosClient.post('/auth/login', payload);
}

export async function verifyOtp(payload: { userId: string; otp: string }) {
  return axiosClient.post('/auth/otp/verify', payload);
}

export async function refreshToken(payload: { refreshToken: string }) {
  return axiosClient.post('/auth/refresh', payload);
}
