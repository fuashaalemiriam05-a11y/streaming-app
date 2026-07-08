import { Worker } from 'bullmq';
const connection = { url: process.env.REDIS_URL || 'redis://localhost:6379' };
new Worker('transcoding', async (job) => {
    console.log(`Transcoding job ${job.id}`);
}, { connection });
new Worker('notifications', async (job) => {
    console.log(`Notification job ${job.id}`);
}, { connection });
