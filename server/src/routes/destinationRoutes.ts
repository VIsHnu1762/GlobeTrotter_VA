import { Router, Request, Response, NextFunction } from 'express';
import destinationRepository from '../repositories/destinationRepository.js';
import { ApiResponse } from '../types/index.js';

const router = Router();

// Search destinations (for autocomplete)
router.get('/search', async (req: Request, res: Response<ApiResponse>, next: NextFunction) => {
    try {
        const { q, limit } = req.query;

        if (!q || typeof q !== 'string') {
            return res.status(400).json({
                success: false,
                message: 'Query parameter "q" is required',
            });
        }

        const destinations = await destinationRepository.searchDestinations(
            q,
            limit ? parseInt(limit as string) : 10
        );

        res.json({
            success: true,
            data: destinations,
            message: `Found ${destinations.length} destinations`,
        });
    } catch (error) {
        next(error);
    }
});

// Get popular destinations
router.get('/popular', async (req: Request, res: Response<ApiResponse>, next: NextFunction) => {
    try {
        const { limit } = req.query;
        const destinations = await destinationRepository.getPopularDestinations(
            limit ? parseInt(limit as string) : 20
        );

        res.json({
            success: true,
            data: destinations,
        });
    } catch (error) {
        next(error);
    }
});

// Get destinations by continent
router.get('/continent/:continent', async (req: Request, res: Response<ApiResponse>, next: NextFunction) => {
    try {
        const { continent } = req.params;
        const destinations = await destinationRepository.getByContinent(continent);

        res.json({
            success: true,
            data: destinations,
            message: `Found ${destinations.length} destinations in ${continent}`,
        });
    } catch (error) {
        next(error);
    }
});

// Get all continents
router.get('/continents', async (req: Request, res: Response<ApiResponse>, next: NextFunction) => {
    try {
        const continents = await destinationRepository.getContinents();

        res.json({
            success: true,
            data: continents,
        });
    } catch (error) {
        next(error);
    }
});

// Get budget-friendly destinations
router.get('/budget-friendly', async (req: Request, res: Response<ApiResponse>, next: NextFunction) => {
    try {
        const { maxBudget, limit } = req.query;

        if (!maxBudget) {
            return res.status(400).json({
                success: false,
                message: 'Query parameter "maxBudget" is required',
            });
        }

        const destinations = await destinationRepository.getBudgetFriendly(
            parseInt(maxBudget as string),
            limit ? parseInt(limit as string) : 10
        );

        res.json({
            success: true,
            data: destinations,
            message: `Found ${destinations.length} budget-friendly destinations`,
        });
    } catch (error) {
        next(error);
    }
});

// Get destination by city and country
router.get('/:city/:country', async (req: Request, res: Response<ApiResponse>, next: NextFunction) => {
    try {
        const { city, country } = req.params;
        const destination = await destinationRepository.getByLocation(city, country);

        if (!destination) {
            return res.status(404).json({
                success: false,
                message: 'Destination not found',
            });
        }

        res.json({
            success: true,
            data: destination,
        });
    } catch (error) {
        next(error);
    }
});

export default router;
