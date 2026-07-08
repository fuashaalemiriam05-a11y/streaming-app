import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { axiosClient } from '@/api/axiosClient';
import type { ModerationFlag } from '../types';

async function fetchFlags() {
  const response = await axiosClient.get('/moderation/queue');
  return response.data?.data as ModerationFlag[];
}

async function reviewFlag(flagId: string, action: 'approve' | 'reject') {
  const response = await axiosClient.post(`/moderation/flags/${flagId}/review`, { action, adminId: 'admin-1' });
  return response.data?.data as ModerationFlag;
}

export function useModeration() {
  const queryClient = useQueryClient();

  const { data: flags = [], isLoading } = useQuery({ queryKey: ['moderation-flags'], queryFn: fetchFlags });

  const reviewMutation = useMutation({
    mutationFn: ({ flagId, action }: { flagId: string; action: 'approve' | 'reject' }) => reviewFlag(flagId, action),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['moderation-flags'] }),
  });

  return { flags, isLoading, reviewMutation };
}
