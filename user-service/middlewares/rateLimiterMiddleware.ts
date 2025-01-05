import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import redisClient from '../redis/redisClient';


export const loginRateLimiter = rateLimit({
    store: new RedisStore({
        sendCommand: async (...args) => redisClient.sendCommand(args),
    }),
    windowMs: 60 * 1000,
    max: 5, 
    message: {
        error: 'Too many login attempts. Please try again after a minute.',
    },
    standardHeaders: true,
    legacyHeaders: false,
});
