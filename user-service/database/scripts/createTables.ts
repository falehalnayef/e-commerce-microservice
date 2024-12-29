import client from '../db';

export const initializeDatabase = async (): Promise<void> => {
    try {
        const createUsersTable = `
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                phone VARCHAR(20),
                address TEXT,
                is_verified BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
            );
        `;

        await client.query(createUsersTable);
        console.log('Users table created or already exists');
    } catch (error) {
        console.error('Error creating tables:', error);
        throw error;
    }
};

export default initializeDatabase;
