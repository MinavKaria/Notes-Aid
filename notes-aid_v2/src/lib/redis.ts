import Redis from 'ioredis';

const REDIS_URL = process.env.REDIS_URL || '';

if (!REDIS_URL) {
  throw new Error('Please define the REDIS_URL environment variable inside .env.local');
}

let redis: Redis | null = null;

declare global {
  var redis: Redis | undefined;
}

// Cast the global object to include our redis property
const globalWithRedis = global;

if (!globalWithRedis.redis) {
  globalWithRedis.redis = new Redis(REDIS_URL);
}
redis = globalWithRedis.redis;

export default redis;