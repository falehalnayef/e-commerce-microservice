import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import redisClient from '../redis/redisClient';


export const rateLimiter = rateLimit({
    store: new RedisStore({
        sendCommand: async (...args) => redisClient.sendCommand(args),
    }),
    windowMs: 60 * 1000,
    max: 10, 
    message: {
        error: 'Too many attempts. Please try again after a minute.',
    },
    standardHeaders: true,
    legacyHeaders: false,
});
