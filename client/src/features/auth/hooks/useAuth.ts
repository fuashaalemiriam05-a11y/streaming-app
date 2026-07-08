import { useMutation } from '@tanstack/react-query';
import { login, refreshToken, signup, verifyOtp } from '@/api/endpoints/auth';

export function useAuth() {
  const signupMutation = useMutation({ mutationFn: signup });
  const loginMutation = useMutation({ mutationFn: login });
  const otpMutation = useMutation({ mutationFn: verifyOtp });
  const refreshMutation = useMutation({ mutationFn: refreshToken });

  return {
    signupMutation,
    loginMutation,
    otpMutation,
    refreshMutation,
  };
}
