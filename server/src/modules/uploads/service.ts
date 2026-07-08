import { randomUUID } from 'crypto';
import { mkdir, writeFile } from 'fs/promises';
import path from 'path';
import { prisma } from '../../config/prisma.js';
import { transcodingQueue } from '../../queues/transcoding.js';
import { AppError } from '../../middleware/errorHandler.js';
import type { UploadCreateInput, UploadCreateResult } from './types.js';

const TEMP_UPLOAD_ROOT = path.resolve(process.cwd(), 'temp-uploads');

async function ensureTempUploadDirectory() {
  await mkdir(TEMP_UPLOAD_ROOT, { recursive: true });
}

export const uploadsService = {
  create: async (input: UploadCreateInput): Promise<UploadCreateResult> => {
    await ensureTempUploadDirectory();

    const uploadId = randomUUID();
    const storagePath = path.join(TEMP_UPLOAD_ROOT, `${uploadId}-${input.fileName}`);
    const video = await prisma.video.create({
      data: {
        title: input.title,
        description: input.fileName,
        status: 'PROCESSING',
      },
    });

    await writeFile(storagePath, '', 'utf8');
    await transcodingQueue.add('transcode', { videoId: video.id, uploadId, storagePath });

    return {
      uploadId,
      videoId: video.id,
      status: 'PROCESSING',
      storagePath,
    };
  },

  processChunk: async (uploadId: string, chunk: Buffer) => {
    const storagePath = path.join(TEMP_UPLOAD_ROOT, `${uploadId}.part`);
    await ensureTempUploadDirectory();
    await writeFile(storagePath, chunk, { flag: 'a' });
    return { uploadId, status: 'UPLOADING' };
  },
};
