export type ModerationFlag = {
  id: string;
  videoTitle: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
};
