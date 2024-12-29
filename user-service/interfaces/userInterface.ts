export interface User {
    id: number;
    name: string;
    email: string;
    password_hash: string;
    phone?: string;
    address?: string;
    is_verified: boolean;
    created_at: Date;
    updated_at: Date;
}

