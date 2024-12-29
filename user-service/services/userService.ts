import bcrypt from 'bcrypt';
import { createUser } from '../database/models/userModel';

export const createUserService = async (name: string, email: string, password: string, phone?: string, address?: string) => {
 
    const hashedPassword = await bcrypt.hash(password, 10);
    await createUser(name, email, hashedPassword, phone, address);
};