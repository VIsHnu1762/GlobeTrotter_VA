import pool from '../config/database.js';
import { Trip } from '../types/index.js';
import { v4 as uuidv4 } from 'uuid';

export class TripRepository {
    async findByUserId(userId: string): Promise<Trip[]> {
        const result = await pool.query(
            'SELECT * FROM trips WHERE user_id = $1 ORDER BY start_date DESC',
            [userId]
        );
        return result.rows;
    }

    async findById(id: string): Promise<Trip | null> {
        const result = await pool.query('SELECT * FROM trips WHERE id = $1', [id]);
        return result.rows[0] || null;
    }

    async findByShareToken(token: string): Promise<Trip | null> {
        const result = await pool.query(
            'SELECT * FROM trips WHERE share_token = $1 AND is_public = true',
            [token]
        );
        return result.rows[0] || null;
    }

    async findPublicTrips(userId: string, limit: number = 20): Promise<Trip[]> {
        const result = await pool.query(
            'SELECT * FROM trips WHERE is_public = true AND user_id != $1 ORDER BY created_at DESC LIMIT $2',
            [userId, limit]
        );
        return result.rows;
    }

    async create(data: any): Promise<Trip> {
        const id = uuidv4();
        const result = await pool.query(
            `INSERT INTO trips (id, user_id, title, description, start_date, end_date, is_public)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
            [
                id,
                data.user_id,
                data.title,
                data.description || null,
                data.start_date,
                data.end_date,
                data.is_public || false,
            ]
        );
        return result.rows[0];
    }

    async update(id: string, data: any): Promise<Trip> {
        const fields: string[] = [];
        const values: any[] = [];
        let paramCount = 1;

        if (data.title !== undefined) {
            fields.push(`title = $${paramCount++}`);
            values.push(data.title);
        }
        if (data.description !== undefined) {
            fields.push(`description = $${paramCount++}`);
            values.push(data.description);
        }
        if (data.start_date !== undefined) {
            fields.push(`start_date = $${paramCount++}`);
            values.push(data.start_date);
        }
        if (data.end_date !== undefined) {
            fields.push(`end_date = $${paramCount++}`);
            values.push(data.end_date);
        }
        if (data.is_public !== undefined) {
            fields.push(`is_public = $${paramCount++}`);
            values.push(data.is_public);
        }

        fields.push('updated_at = CURRENT_TIMESTAMP');
        values.push(id);

        const result = await pool.query(
            `UPDATE trips SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`,
            values
        );

        return result.rows[0];
    }

    async delete(id: string): Promise<void> {
        await pool.query('DELETE FROM trips WHERE id = $1', [id]);
    }

    async generateShareToken(id: string): Promise<string> {
        const shareToken = uuidv4();
        await pool.query(
            'UPDATE trips SET share_token = $1, is_public = true WHERE id = $2',
            [shareToken, id]
        );
        return shareToken;
    }

    async getStats(): Promise<{ totalTrips: number; publicTrips: number }> {
        const result = await pool.query(`
      SELECT 
        COUNT(*) as total_trips,
        COUNT(CASE WHEN is_public = true THEN 1 END) as public_trips
      FROM trips
    `);
        return {
            totalTrips: parseInt(result.rows[0].total_trips),
            publicTrips: parseInt(result.rows[0].public_trips),
        };
    }
}

export default new TripRepository();
