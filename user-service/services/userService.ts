import bcrypt from 'bcrypt';
import { createUser, findUserByEmail, getUserById, resetPassword, updateUser, verifyUser } from '../database/models/userModel';
import { statusError } from '../utils/statusError';
import { generateOTP } from '../utils/otpGen';
import { sendEmail } from '../utils/mail';
import { deleteOTP, getOTP, setOTP } from '../redis/redisClient';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../interfaces/userInterface';
dotenv.config();

export const createUserService = async (name: string, email: string, password: string, phone?: string, address?: string) => {
 
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser(name, email, hashedPassword, phone, address);
    const otp = generateOTP();
    await setOTP(user.email, otp, 60);
    sendEmail(email, 'OTP Verification', `Your OTP is ${otp}`);
};

export const verifyUserOtp = async (email: string, otp: string) => {
    if(!email || !otp) {
        throw new statusError(400, 'Email and OTP are required');
    }
    const userOtp = await getOTP(email);
    if (!userOtp) {
        throw new statusError(404, 'OTP not found');
    }
    if (userOtp !== otp) {
        throw new statusError(401, 'Invalid OTP');
    }
    await deleteOTP(email);
    await verifyUser(email);
};

export const sendOtpEmail = async (email: string) => {
    if(!email) {
        throw new statusError(400, 'Email is required');
    }
    const otp = generateOTP();
    await setOTP(email, otp, 60);
    sendEmail(email, 'OTP Verification', `Your OTP is ${otp}`);
};

export const loginUser = async (email: string, password: string) => {

    if(!email || !password) {
        throw new statusError(400, 'Email and password are required');
    }
    const user = await findUserByEmail(email);
    if (!user) {
        throw new statusError(404, 'User not found');
    }
    if (!user.is_verified) {
        throw new statusError(401, 'User not verified');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new statusError(401, 'Invalid password');
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    return { user_id: user.id, token };
};

export const updateUserService = async (id: string, name: string, phone: string, address: string) => {
    const user = await updateUser(id, name, phone, address);
    if (!user) {
        throw new statusError(404, 'User not found');
    }
    return user;
};

export const resetPasswordService = async (user: User, oldPassword: string, newPassword: string) => {
   
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
        throw new statusError(401, 'Invalid password');
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const userData = await resetPassword(user.id.toString(), hashedPassword);
    return userData;
};


export const updatePasswordService = async (email: string, password: string, otp: string) => {
    

    const userOtp = await getOTP(email);
    if (!userOtp) {
        throw new statusError(404, 'OTP not found');
    }
    if (userOtp !== otp) {
        throw new statusError(401, 'Invalid OTP');
    }
     deleteOTP(email);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await resetPassword(email, hashedPassword);
    return user;
};