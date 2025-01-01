import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { statusError } from '../utils/statusError';
import { getUserById } from '../database/models/userModel';
dotenv.config();

export const authenticateToken = (req: any, _res: Response, next: NextFunction) => {
    const token = req.headers['authorization'];
    if (!token) {
        next(new statusError(401, 'Unauthorized'));
    }
    jwt.verify(token, process.env.JWT_SECRET!, async (err: any, user: any) => {
        if (err) {
            return next(new statusError(403, 'Forbidden'));
        }
        const userData = await getUserById(user.id);
        if (!userData) {
            return next(new statusError(404, 'User not found'));
        }
        req.user = userData;
        next();
    });
};

