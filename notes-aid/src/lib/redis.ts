import Redis from 'ioredis';

const REDIS_URL = process.env.REDIS_URL || '';

if (!REDIS_URL) {
  throw new Error('Please define the REDIS_URL environment variable inside .env.local');
}

let redis: Redis | null = null;

if (!(global as any).redis) {
  (global as any).redis = new Redis(REDIS_URL);
}
redis = (global as any).redis;

export default redis;
