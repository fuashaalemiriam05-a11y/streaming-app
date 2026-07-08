import { Worker } from 'bullmq';
import { prisma } from '../config/prisma.js';
import { transcodeWorker } from './transcodeWorker.js';

const connection = { url: process.env.REDIS_URL || 'redis://localhost:6379' };

new Worker('transcoding', async (job) => {
  await transcodeWorker(job.data);
}, { connection });

new Worker('notifications', async (job) => {
  console.log(`Notification job ${job.id}`);
}, { connection });
