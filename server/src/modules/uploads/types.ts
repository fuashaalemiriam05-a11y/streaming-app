export type UploadCreateInput = {
  title: string;
  fileName: string;
  mimeType?: string;
  chunkSize?: number;
  totalSize?: number;
};

export type UploadCreateResult = {
  uploadId: string;
  videoId: string;
  status: 'PROCESSING' | 'READY';
  storagePath: string;
};
