import pool from '../config/database.js';
import { Expense, ExpenseCategory } from '../types/index.js';
import { v4 as uuidv4 } from 'uuid';

export class ExpenseRepository {
    async findByTripId(tripId: string): Promise<Expense[]> {
        const result = await pool.query(
            'SELECT * FROM expenses WHERE trip_id = $1 ORDER BY date DESC',
            [tripId]
        );
        return result.rows;
    }

    async findById(id: string): Promise<Expense | null> {
        const result = await pool.query('SELECT * FROM expenses WHERE id = $1', [id]);
        return result.rows[0] || null;
    }

    async create(data: any): Promise<Expense> {
        const id = uuidv4();
        const result = await pool.query(
            `INSERT INTO expenses (id, trip_id, stop_id, activity_id, title, amount, currency, category, date, notes)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING *`,
            [
                id,
                data.trip_id,
                data.stop_id || null,
                data.activity_id || null,
                data.title,
                data.amount,
                data.currency || 'USD',
                data.category,
                data.date,
                data.notes || null,
            ]
        );
        return result.rows[0];
    }

    async update(id: string, data: any): Promise<Expense> {
        const fields: string[] = [];
        const values: any[] = [];
        let paramCount = 1;

        const updateFields = ['title', 'amount', 'currency', 'category', 'date', 'notes', 'stop_id', 'activity_id'];

        for (const field of updateFields) {
            if (data[field] !== undefined) {
                fields.push(`${field} = $${paramCount++}`);
                values.push(data[field]);
            }
        }

        fields.push('updated_at = CURRENT_TIMESTAMP');
        values.push(id);

        const result = await pool.query(
            `UPDATE expenses SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`,
            values
        );

        return result.rows[0];
    }

    async delete(id: string): Promise<void> {
        await pool.query('DELETE FROM expenses WHERE id = $1', [id]);
    }

    async getBudgetSummary(tripId: string): Promise<any> {
        const result = await pool.query(
            `SELECT 
        SUM(amount) as total_expenses,
        currency,
        category,
        SUM(amount) as category_total
       FROM expenses 
       WHERE trip_id = $1
       GROUP BY currency, category`,
            [tripId]
        );

        const byCategory: Record<string, number> = {};
        let totalExpenses = 0;
        let currency = 'USD';

        for (const row of result.rows) {
            byCategory[row.category] = parseFloat(row.category_total);
            totalExpenses += parseFloat(row.category_total);
            currency = row.currency;
        }

        return {
            totalExpenses,
            currency,
            byCategory,
        };
    }
}

export default new ExpenseRepository();
