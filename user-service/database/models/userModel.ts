import { User } from '../../interfaces/userInterface';
import pool from '../db';


export const createUser = async (name: string, email: string, password: string, phone?: string, address?: string) => {
    const query = `
        INSERT INTO users (name, email, password, phone, address) 
        VALUES ($1, $2, $3, $4, $5) RETURNING id email;
    `;
    const values = [name, email, password, phone, address];
    const result = await pool.query(query, values);
    return result.rows[0] || null;
};

export const findUserByEmail = async (email: string): Promise<User | null> => {
    const query = `SELECT * FROM users WHERE email = $1`;
    const result = await pool.query(query, [email]);
    return result.rows[0] || null;
};

export const verifyUser = async (email: string) => {
    const query = `UPDATE users SET is_verified = TRUE WHERE email = $1`;
    const values = [email];
    const result = await pool.query(query, values);
    return result.rows[0] || null;
};

export const getUserById = async (id: string): Promise<User | null> => {
    const query = `SELECT * FROM users WHERE id = $1`;
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
};

export const updateUser = async (id: string, name: string,phone: string, address: string): Promise<User | null> => {
    const query = `UPDATE users SET name = $1, phone = $2, address = $3 WHERE id = $4 RETURNING *`;
    const values = [name, phone, address, id];
    const result = await pool.query(query, values);
    return result.rows[0] || null;
};