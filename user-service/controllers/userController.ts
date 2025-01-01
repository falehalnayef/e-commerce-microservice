import { NextFunction, Response } from 'express';
import { createUserService, loginUser, sendOtpEmail, updateUserService, verifyUserOtp } from '../services/userService';
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

export const verifyUserController = async (req: any, res: Response, next: NextFunction) => {
    const { email, otp } = req.body;
    await verifyUserOtp(email, otp);
    res.status(200).json(successResponse(true, 'User verified successfully', null));
};

export const sendOtpController = async (req: any, res: Response, next: NextFunction) => {
    const { email } = req.body;
    await sendOtpEmail(email);
    res.status(200).json(successResponse(true, 'OTP sent successfully', null));
};
export const loginUserController = async (req: any, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const user = await loginUser(email, password);
    res.status(200).json(successResponse(true, 'User logged in successfully', user));
};

export const getUserController = async (req: any, res: Response, next: NextFunction) => {
    const user = req.user;
    res.status(200).json(successResponse(true, 'User fetched successfully', user));
};

export const updateUserController = async (req: any, res: Response, next: NextFunction) => {
    const { name, phone, address } = req.body;
    const user = await updateUserService(req.user.id, name, phone, address);
    res.status(200).json(successResponse(true, 'User updated successfully', user));
};