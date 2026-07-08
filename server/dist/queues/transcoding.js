import { Queue } from 'bullmq';
export const transcodingQueue = new Queue('transcoding', {
    connection: { url: process.env.REDIS_URL || 'redis://localhost:6379' },
});
