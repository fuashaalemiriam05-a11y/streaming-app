import { mkdir, writeFile } from 'fs/promises';
import path from 'path';
import { prisma } from '../config/prisma.js';

type TranscodeJobData = {
  videoId: string;
  uploadId: string;
  storagePath: string;
};

export async function transcodeWorker(data: TranscodeJobData) {
  const outputDir = path.resolve(process.cwd(), 'public', 'hls', data.videoId);
  await mkdir(outputDir, { recursive: true });
  await writeFile(path.join(outputDir, 'playlist.m3u8'), '#EXTM3U\n', 'utf8');

  await prisma.video.update({
    where: { id: data.videoId },
    data: { status: 'READY' },
  });

  return { outputDir };
}
