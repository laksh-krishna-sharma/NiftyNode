import Redis from 'ioredis';
import appConfig from '../config';

const redisClient = new Redis(appConfig.REDIS_URL || 'redis://localhost:6379');

redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
  console.error('Redis connection error:', err);
});

export default redisClient;