#!/usr/bin/env node

/**
 * Database Seed Runner
 * Populates database with sample data for development
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from '../src/config/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SEEDS_DIR = path.join(__dirname, '../database/seeds');

async function runSeeds() {
    try {
        console.log('🌱 Seeding database with sample data...\n');

        // Get all seed files
        const files = fs
            .readdirSync(SEEDS_DIR)
            .filter((file) => file.endsWith('.sql'))
            .sort();

        if (files.length === 0) {
            console.log('⚠️  No seed files found');
            return;
        }

        for (const file of files) {
            console.log(`📄 Executing: ${file}`);
            const filePath = path.join(SEEDS_DIR, file);
            const sql = fs.readFileSync(filePath, 'utf8');

            await pool.query(sql);
            console.log(`✅ Completed: ${file}\n`);
        }

        console.log('✨ Database seeded successfully!');
        console.log('\n📝 Test Accounts:');
        console.log('   Admin: admin@globetrotter.com / Admin@123');
        console.log('   User:  user@globetrotter.com / User@123');
    } catch (error) {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    } finally {
        await pool.end();
    }
}

runSeeds();
