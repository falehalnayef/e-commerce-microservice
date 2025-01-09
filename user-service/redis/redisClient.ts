import { createClient } from 'redis';

import dotenv from 'dotenv';
dotenv.config();

const redisClient = createClient({
    url: process.env.REDIS_URL,
});

redisClient.on('error', (err: any) => console.error('Redis Client Error', err));

(async () => {
    await redisClient.connect();
})();

export const setData = async (key: string, value: string, ttl: number) => {
    await redisClient.set(key, value, { EX: ttl });
};

export const getData = async (key: string): Promise<string | null> => {
    return await redisClient.get(key);
};

export const deleteData = async (key: string) => {
    await redisClient.del(key);
};

export default redisClient;
