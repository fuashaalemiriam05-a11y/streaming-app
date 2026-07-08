import { useMutation } from '@tanstack/react-query';
import { uploadVideo } from '@/api/endpoints/uploads';

export function useChunkedUpload() {
  return useMutation({ mutationFn: uploadVideo });
}
