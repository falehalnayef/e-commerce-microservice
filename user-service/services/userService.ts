import bcrypt from 'bcrypt';
import { createUser, verifyUser } from '../database/models/userModel';
import { statusError } from '../utils/statusError';
import { generateOTP } from '../utils/otpGen';
import { sendEmail } from '../utils/mail';
import { deleteOTP, getOTP, setOTP } from '../redis/redisClient';

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

