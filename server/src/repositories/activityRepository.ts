import pool from '../config/database.js';
import { Activity } from '../types/index.js';
import { v4 as uuidv4 } from 'uuid';

export class ActivityRepository {
    async findByStopId(stopId: string): Promise<Activity[]> {
        const result = await pool.query(
            'SELECT * FROM activities WHERE stop_id = $1 ORDER BY date ASC, time ASC',
            [stopId]
        );
        return result.rows;
    }

    async findById(id: string): Promise<Activity | null> {
        const result = await pool.query('SELECT * FROM activities WHERE id = $1', [id]);
        return result.rows[0] || null;
    }

    async create(data: any): Promise<Activity> {
        const id = uuidv4();
        const result = await pool.query(
            `INSERT INTO activities (id, stop_id, title, description, date, time, duration, category, notes)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
            [
                id,
                data.stop_id,
                data.title,
                data.description || null,
                data.date,
                data.time || null,
                data.duration || null,
                data.category || null,
                data.notes || null,
            ]
        );
        return result.rows[0];
    }

    async update(id: string, data: any): Promise<Activity> {
        const fields: string[] = [];
        const values: any[] = [];
        let paramCount = 1;

        const updateFields = ['title', 'description', 'date', 'time', 'duration', 'category', 'notes'];

        for (const field of updateFields) {
            if (data[field] !== undefined) {
                fields.push(`${field} = $${paramCount++}`);
                values.push(data[field]);
            }
        }

        fields.push('updated_at = CURRENT_TIMESTAMP');
        values.push(id);

        const result = await pool.query(
            `UPDATE activities SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`,
            values
        );

        return result.rows[0];
    }

    async delete(id: string): Promise<void> {
        await pool.query('DELETE FROM activities WHERE id = $1', [id]);
    }
}

export default new ActivityRepository();
