import pool from '../config/database.js';

export interface Destination {
    id: string;
    city: string;
    country: string;
    countryCode: string;
    continent: string;
    latitude: number;
    longitude: number;
    description: string;
    popularAttractions: string[];
    bestMonths: string;
    avgBudgetPerDay: number;
    timezone: string;
}

class DestinationRepository {
    // Search destinations by city or country name
    async searchDestinations(query: string, limit: number = 10): Promise<Destination[]> {
        const result = await pool.query(
            `SELECT 
                id,
                city,
                country,
                country_code as "countryCode",
                continent,
                latitude,
                longitude,
                description,
                popular_attractions as "popularAttractions",
                best_months as "bestMonths",
                avg_budget_per_day as "avgBudgetPerDay",
                timezone
            FROM destinations
            WHERE 
                LOWER(city) LIKE LOWER($1) OR 
                LOWER(country) LIKE LOWER($1) OR
                LOWER(city || ', ' || country) LIKE LOWER($1)
            ORDER BY 
                CASE 
                    WHEN LOWER(city) = LOWER($2) THEN 1
                    WHEN LOWER(city) LIKE LOWER($1) THEN 2
                    ELSE 3
                END,
                city
            LIMIT $3`,
            [`%${query}%`, query, limit]
        );
        return result.rows;
    }

    // Get all destinations for a specific continent
    async getByContinent(continent: string): Promise<Destination[]> {
        const result = await pool.query(
            `SELECT 
                id,
                city,
                country,
                country_code as "countryCode",
                continent,
                latitude,
                longitude,
                description,
                popular_attractions as "popularAttractions",
                best_months as "bestMonths",
                avg_budget_per_day as "avgBudgetPerDay",
                timezone
            FROM destinations
            WHERE continent = $1
            ORDER BY country, city`,
            [continent]
        );
        return result.rows;
    }

    // Get popular destinations (top budget-friendly or top attractions)
    async getPopularDestinations(limit: number = 20): Promise<Destination[]> {
        const result = await pool.query(
            `SELECT 
                id,
                city,
                country,
                country_code as "countryCode",
                continent,
                latitude,
                longitude,
                description,
                popular_attractions as "popularAttractions",
                best_months as "bestMonths",
                avg_budget_per_day as "avgBudgetPerDay",
                timezone
            FROM destinations
            ORDER BY array_length(popular_attractions, 1) DESC
            LIMIT $1`,
            [limit]
        );
        return result.rows;
    }

    // Get destination by exact city and country
    async getByLocation(city: string, country: string): Promise<Destination | null> {
        const result = await pool.query(
            `SELECT 
                id,
                city,
                country,
                country_code as "countryCode",
                continent,
                latitude,
                longitude,
                description,
                popular_attractions as "popularAttractions",
                best_months as "bestMonths",
                avg_budget_per_day as "avgBudgetPerDay",
                timezone
            FROM destinations
            WHERE LOWER(city) = LOWER($1) AND LOWER(country) = LOWER($2)`,
            [city, country]
        );
        return result.rows[0] || null;
    }

    // Get all continents
    async getContinents(): Promise<string[]> {
        const result = await pool.query(
            `SELECT DISTINCT continent 
            FROM destinations 
            ORDER BY continent`
        );
        return result.rows.map(row => row.continent);
    }

    // Get budget-friendly destinations (under a certain amount per day)
    async getBudgetFriendly(maxBudget: number, limit: number = 10): Promise<Destination[]> {
        const result = await pool.query(
            `SELECT 
                id,
                city,
                country,
                country_code as "countryCode",
                continent,
                latitude,
                longitude,
                description,
                popular_attractions as "popularAttractions",
                best_months as "bestMonths",
                avg_budget_per_day as "avgBudgetPerDay",
                timezone
            FROM destinations
            WHERE avg_budget_per_day <= $1
            ORDER BY avg_budget_per_day ASC
            LIMIT $2`,
            [maxBudget, limit]
        );
        return result.rows;
    }
}

export default new DestinationRepository();
