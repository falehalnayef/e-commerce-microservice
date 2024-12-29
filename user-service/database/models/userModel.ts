import { User } from '../../interfaces/userInterface';
import pool from '../db';


export const createUser = async (name: string, email: string, password: string, phone?: string, address?: string) => {
    const query = `
        INSERT INTO users (name, email, password, phone, address) 
        VALUES ($1, $2, $3, $4, $5);
    `;
    const values = [name, email, password, phone, address];
    await pool.query(query, values);
};

export const findUserByEmail = async (email: string): Promise<User | null> => {
    const query = `SELECT * FROM users WHERE email = $1`;
    const result = await pool.query(query, [email]);
    return result.rows[0] || null;
};
