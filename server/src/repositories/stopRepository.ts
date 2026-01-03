import pool from '../config/database.js';
import { Stop } from '../types/index.js';
import { v4 as uuidv4 } from 'uuid';

export class StopRepository {
    async findByTripId(tripId: string): Promise<Stop[]> {
        const result = await pool.query(
            `SELECT 
                s.*,
                d.latitude,
                d.longitude
            FROM stops s
            LEFT JOIN destinations d ON LOWER(s.city) = LOWER(d.city) AND LOWER(s.country) = LOWER(d.country)
            WHERE s.trip_id = $1 
            ORDER BY s.order_index ASC`,
            [tripId]
        );
        return result.rows;
    }

    async findById(id: string): Promise<Stop | null> {
        const result = await pool.query('SELECT * FROM stops WHERE id = $1', [id]);
        return result.rows[0] || null;
    }

    async create(data: any): Promise<Stop> {
        const id = uuidv4();

        // Get next order index
        const orderResult = await pool.query(
            'SELECT COALESCE(MAX(order_index), -1) + 1 as next_order FROM stops WHERE trip_id = $1',
            [data.trip_id]
        );
        const orderIndex = orderResult.rows[0].next_order;

        const result = await pool.query(
            `INSERT INTO stops (id, trip_id, city, country, order_index, start_date, end_date, notes)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
            [
                id,
                data.trip_id,
                data.city,
                data.country,
                orderIndex,
                data.start_date,
                data.end_date,
                data.notes || null,
            ]
        );
        return result.rows[0];
    }

    async update(id: string, data: any): Promise<Stop> {
        const fields: string[] = [];
        const values: any[] = [];
        let paramCount = 1;

        if (data.city !== undefined) {
            fields.push(`city = $${paramCount++}`);
            values.push(data.city);
        }
        if (data.country !== undefined) {
            fields.push(`country = $${paramCount++}`);
            values.push(data.country);
        }
        if (data.start_date !== undefined) {
            fields.push(`start_date = $${paramCount++}`);
            values.push(data.start_date);
        }
        if (data.end_date !== undefined) {
            fields.push(`end_date = $${paramCount++}`);
            values.push(data.end_date);
        }
        if (data.notes !== undefined) {
            fields.push(`notes = $${paramCount++}`);
            values.push(data.notes);
        }

        fields.push('updated_at = CURRENT_TIMESTAMP');
        values.push(id);

        const result = await pool.query(
            `UPDATE stops SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`,
            values
        );

        return result.rows[0];
    }

    async delete(id: string): Promise<void> {
        await pool.query('DELETE FROM stops WHERE id = $1', [id]);
    }

    async reorder(tripId: string, stopIds: string[]): Promise<Stop[]> {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');

            for (let i = 0; i < stopIds.length; i++) {
                await client.query(
                    'UPDATE stops SET order_index = $1 WHERE id = $2 AND trip_id = $3',
                    [i, stopIds[i], tripId]
                );
            }

            await client.query('COMMIT');

            const result = await client.query(
                'SELECT * FROM stops WHERE trip_id = $1 ORDER BY order_index ASC',
                [tripId]
            );
            return result.rows;
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }
}

export default new StopRepository();
