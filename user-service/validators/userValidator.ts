import { NextFunction, Response } from "express";
import { statusError } from "../utils/statusError";

export const createUserValidator = (req: any, _: Response, next: NextFunction) => {
    const { name, email, password, phone } = req.body;
    const nameRegex = /^[a-zA-Z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;

    if (!name || !nameRegex.test(name)) {
        return next(new statusError(400, 'Invalid name: only alphabetic characters and spaces are allowed.'));
    }

    if (!email || !emailRegex.test(email)) {
        return next(new statusError(400, 'Invalid email address.'));
    }

    if (!password || !passwordRegex.test(password)) {
        return next(new statusError(400, 'Invalid password: must be at least 8 characters long, include uppercase, lowercase, a number, and a special character.'));
    }

    if (phone && !phoneRegex.test(phone)) {
        return next(new statusError(400, 'Invalid phone number: must follow E.164 format.'));
    }

    next();
};

export const updateUserValidator = (req: any, _: Response, next: NextFunction) => {
    const { name, phone, address } = req.body;
    const nameRegex = /^[a-zA-Z\s]+$/;
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;

    if (!name || !nameRegex.test(name)) {
        return next(new statusError(400, 'Invalid name: only alphabetic characters and spaces are allowed.'));
    }

    if (phone && !phoneRegex.test(phone)) {
        return next(new statusError(400, 'Invalid phone number: must follow E.164 format.'));
    }

    if (!address) {
        return next(new statusError(400, 'Address is required.'));
    }

    next();
};

export const resetPasswordValidator = (req: any, _: Response, next: NextFunction) => {
    const { oldPassword, newPassword } = req.body;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!oldPassword || !newPassword) {
        return next(new statusError(400, 'Old password and new password are required.'));
    }
    if (!passwordRegex.test(newPassword)) {
        return next(new statusError(400, 'Invalid password: must be at least 8 characters long, include uppercase, lowercase, a number, and a special character.'));
    }
    next();
};

export const forgotPasswordValidator = (req: any, _: Response, next: NextFunction) => {
    const { email, password, otp } = req.body;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!email || !password || !otp) {
        return next(new statusError(400, 'Email, password, and OTP are required.'));
    }
    if (!passwordRegex.test(password)) {
        return next(new statusError(400, 'Invalid password: must be at least 8 characters long, include uppercase, lowercase, a number, and a special character.'));
    }
    next();
};