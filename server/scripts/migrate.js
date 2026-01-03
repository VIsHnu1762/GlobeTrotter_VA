#!/usr/bin/env node

/**
 * Database Migration Runner
 * Executes SQL migrations in order
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from '../src/config/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MIGRATIONS_DIR = path.join(__dirname, '../database/migrations');

async function runMigrations() {
    try {
        console.log('🔄 Running database migrations...\n');

        // Get all migration files
        const files = fs
            .readdirSync(MIGRATIONS_DIR)
            .filter((file) => file.endsWith('.sql'))
            .sort();

        if (files.length === 0) {
            console.log('⚠️  No migration files found');
            return;
        }

        for (const file of files) {
            console.log(`📄 Executing: ${file}`);
            const filePath = path.join(MIGRATIONS_DIR, file);
            const sql = fs.readFileSync(filePath, 'utf8');

            await pool.query(sql);
            console.log(`✅ Completed: ${file}\n`);
        }

        console.log('✨ All migrations completed successfully!');
    } catch (error) {
        console.error('❌ Migration failed:', error);
        process.exit(1);
    } finally {
        await pool.end();
    }
}

runMigrations();
