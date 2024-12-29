import { NextFunction, Response } from 'express';
import { createUserService } from '../services/userService';
import { AuthenticatedRequest } from '../interfaces/requestInterface';
import { successResponse } from '../utils/response';

export const createUserController = async (req: any, res: Response, next: NextFunction) => {
  
    try {
        const { name, email, password, phone, address } = req.body;
        await createUserService(name, email, password, phone, address);
        res.status(201).json(successResponse(true, 'User created successfully', null));
    } catch (error: any) {
        next(error);
    }
};