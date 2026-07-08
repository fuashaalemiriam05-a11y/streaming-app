import { axiosClient } from '../axiosClient';

export async function uploadVideo(payload: { title: string; fileName: string; mimeType?: string }) {
  return axiosClient.post('/uploads', payload);
}
