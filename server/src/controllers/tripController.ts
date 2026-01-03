import { Response, NextFunction } from 'express';
import tripRepository from '../repositories/tripRepository.js';
import { AppError } from '../middleware/errorHandler.js';
import { ApiResponse } from '../types/index.js';
import { AuthRequest } from '../middleware/auth.js';
import config from '../config/index.js';

export class TripController {
    async getMyTrips(req: AuthRequest, res: Response<ApiResponse>, next: NextFunction) {
        try {
            const trips = await tripRepository.findByUserId(req.user!.id);
            res.json({
                success: true,
                data: trips,
            });
        } catch (error) {
            next(error);
        }
    }

    async getTripById(req: AuthRequest, res: Response<ApiResponse>, next: NextFunction) {
        try {
            const trip = await tripRepository.findById(req.params.id);

            if (!trip) {
                throw new AppError('Trip not found', 404);
            }

            // Check ownership
            if (trip.user_id !== req.user!.id) {
                throw new AppError('Unauthorized', 403);
            }

            res.json({
                success: true,
                data: trip,
            });
        } catch (error) {
            next(error);
        }
    }

    async getSharedTrip(req: AuthRequest, res: Response<ApiResponse>, next: NextFunction) {
        try {
            const trip = await tripRepository.findByShareToken(req.params.token);

            if (!trip) {
                throw new AppError('Shared trip not found', 404);
            }

            res.json({
                success: true,
                data: trip,
            });
        } catch (error) {
            next(error);
        }
    }

    async createTrip(req: AuthRequest, res: Response<ApiResponse>, next: NextFunction) {
        try {
            const tripData = {
                ...req.body,
                user_id: req.user!.id,
            };

            const trip = await tripRepository.create(tripData);

            res.status(201).json({
                success: true,
                data: trip,
                message: 'Trip created successfully',
            });
        } catch (error) {
            next(error);
        }
    }

    async updateTrip(req: AuthRequest, res: Response<ApiResponse>, next: NextFunction) {
        try {
            const trip = await tripRepository.findById(req.params.id);

            if (!trip) {
                throw new AppError('Trip not found', 404);
            }

            if (trip.user_id !== req.user!.id) {
                throw new AppError('Unauthorized', 403);
            }

            const updatedTrip = await tripRepository.update(req.params.id, req.body);

            res.json({
                success: true,
                data: updatedTrip,
                message: 'Trip updated successfully',
            });
        } catch (error) {
            next(error);
        }
    }

    async deleteTrip(req: AuthRequest, res: Response<ApiResponse>, next: NextFunction) {
        try {
            const trip = await tripRepository.findById(req.params.id);

            if (!trip) {
                throw new AppError('Trip not found', 404);
            }

            if (trip.user_id !== req.user!.id) {
                throw new AppError('Unauthorized', 403);
            }

            await tripRepository.delete(req.params.id);

            res.json({
                success: true,
                message: 'Trip deleted successfully',
            });
        } catch (error) {
            next(error);
        }
    }

    async generateShareLink(req: AuthRequest, res: Response<ApiResponse>, next: NextFunction) {
        try {
            const trip = await tripRepository.findById(req.params.id);

            if (!trip) {
                throw new AppError('Trip not found', 404);
            }

            if (trip.user_id !== req.user!.id) {
                throw new AppError('Unauthorized', 403);
            }

            const shareToken = await tripRepository.generateShareToken(req.params.id);
            const shareUrl = `${config.cors.origin}/share/${shareToken}`;

            res.json({
                success: true,
                data: {
                    shareToken,
                    shareUrl,
                },
                message: 'Share link generated successfully',
            });
        } catch (error) {
            next(error);
        }
    }
}

export default new TripController();
