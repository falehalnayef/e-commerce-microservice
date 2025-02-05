import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { statusError } from '../utils/statusError';
import pool from './db';
dotenv.config();

export const authenticateToken = async (token: string): Promise<any> => {
    if (!token) {
        throw new statusError(401, 'Unauthorized');
    }

    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET!, async (err: any, user: any) => {
            if (err) {
                return reject(new statusError(403, 'Forbidden'));
            }

            try {
                let userData = await getUserById(user.id);

                if (!userData) {
                    return reject(new statusError(404, 'User not found'));
                }

                resolve(userData);
            } catch (error) {
                reject(new statusError(500, 'Internal Server Error'));
            }
        });
    });
};


const getUserById = async (id: string): Promise<any> => {
    const query = `SELECT id, name, email, phone, address, password FROM users WHERE id = $1`;
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
};