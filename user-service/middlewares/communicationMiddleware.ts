import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { statusError } from '../utils/statusError';
dotenv.config();

export const authenticateCommunicationToken = (req: any, _res: Response, next: NextFunction) => {
    const token = req.headers["authorizationcomm"];
    if (!token) {
        return next(new statusError(401, 'Unauthorized service'));
    }
    jwt.verify(token, process.env.JWT_COMM_SECRET!, async (err: any, user: any) => {
        if (err) {
            return next(new statusError(403, 'Forbidden'));
        }        
        next();
    });
};

