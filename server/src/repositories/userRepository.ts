import pool from '../config/database.js';
import { User, UserRole } from '../types/index.js';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

export class UserRepository {
    async findByEmail(email: string): Promise<User | null> {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        return result.rows[0] || null;
    }

    async findById(id: string): Promise<User | null> {
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        return result.rows[0] || null;
    }

    async create(email: string, password: string, name: string): Promise<User> {
        const id = uuidv4();
        const hashedPassword = await bcrypt.hash(password, 10);
        const role = UserRole.USER;

        const result = await pool.query(
            `INSERT INTO users (id, email, password, name, role) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING *`,
            [id, email, hashedPassword, name, role]
        );

        return result.rows[0];
    }

    async update(id: string, data: Partial<User>): Promise<User> {
        const fields: string[] = [];
        const values: any[] = [];
        let paramCount = 1;

        if (data.name) {
            fields.push(`name = $${paramCount++}`);
            values.push(data.name);
        }
        if (data.email) {
            fields.push(`email = $${paramCount++}`);
            values.push(data.email);
        }

        fields.push('updated_at = CURRENT_TIMESTAMP');
        values.push(id);

        const result = await pool.query(
            `UPDATE users SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`,
            values
        );

        return result.rows[0];
    }

    async getAll(): Promise<User[]> {
        const result = await pool.query('SELECT * FROM users ORDER BY created_at DESC');
        return result.rows;
    }

    async getStats(): Promise<{ totalUsers: number; activeUsers: number }> {
        const result = await pool.query(`
      SELECT 
        COUNT(*) as total_users,
        COUNT(CASE WHEN role = 'user' THEN 1 END) as active_users
      FROM users
    `);
        return {
            totalUsers: parseInt(result.rows[0].total_users),
            activeUsers: parseInt(result.rows[0].active_users),
        };
    }

    async verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(plainPassword, hashedPassword);
    }
}

export default new UserRepository();
