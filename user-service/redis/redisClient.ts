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

export const setOTP = async (key: string, otp: string, ttl: number) => {
    await redisClient.set(key, otp, { EX: ttl });
};

export const getOTP = async (key: string): Promise<string | null> => {
    return await redisClient.get(key);
};

export const deleteOTP = async (key: string) => {
    await redisClient.del(key);
};

export default redisClient;
