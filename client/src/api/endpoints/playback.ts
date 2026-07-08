import { axiosClient } from '../axiosClient';

export async function getPlaybackSession(videoId: string, userId = 'demo-user') {
  return axiosClient.get(`/playback/${videoId}`, { params: { userId } });
}

export async function updatePlaybackProgress(videoId: string, payload: { userId?: string; position: number; duration?: number }) {
  return axiosClient.post(`/playback/${videoId}/progress`, payload);
}
