import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/index.js';
import userRepository from '../repositories/userRepository.js';
import { AppError } from '../middleware/errorHandler.js';
import { UserResponse, ApiResponse } from '../types/index.js';
import { AuthRequest } from '../middleware/auth.js';

export class AuthController {
    async register(req: Request, res: Response<ApiResponse>, next: NextFunction) {
        try {
            const { email, password, name } = req.body;

            // Check if user already exists
            const existingUser = await userRepository.findByEmail(email);
            if (existingUser) {
                throw new AppError('Email already registered', 400);
            }

            // Create user
            const user = await userRepository.create(email, password, name);

            // Generate JWT
            const userResponse: UserResponse = {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                createdAt: user.created_at.toISOString(),
                updatedAt: user.updated_at.toISOString(),
            };

            const token = jwt.sign(userResponse, config.jwt.secret, {
                expiresIn: config.jwt.expiresIn,
            });

            res.status(201).json({
                success: true,
                data: {
                    user: userResponse,
                    token,
                },
                message: 'User registered successfully',
            });
        } catch (error) {
            next(error);
        }
    }

    async login(req: Request, res: Response<ApiResponse>, next: NextFunction) {
        try {
            const { email, password } = req.body;

            // Find user
            const user = await userRepository.findByEmail(email);
            if (!user) {
                throw new AppError('Invalid credentials', 401);
            }

            // Verify password
            const isValid = await userRepository.verifyPassword(password, user.password);
            if (!isValid) {
                throw new AppError('Invalid credentials', 401);
            }

            // Generate JWT
            const userResponse: UserResponse = {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                createdAt: user.created_at.toISOString(),
                updatedAt: user.updated_at.toISOString(),
            };

            const token = jwt.sign(userResponse, config.jwt.secret, {
                expiresIn: config.jwt.expiresIn,
            });

            res.json({
                success: true,
                data: {
                    user: userResponse,
                    token,
                },
                message: 'Login successful',
            });
        } catch (error) {
            next(error);
        }
    }

    async getCurrentUser(req: AuthRequest, res: Response<ApiResponse>, next: NextFunction) {
        try {
            const user = await userRepository.findById(req.user!.id);
            if (!user) {
                throw new AppError('User not found', 404);
            }

            const userResponse: UserResponse = {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                createdAt: user.created_at.toISOString(),
                updatedAt: user.updated_at.toISOString(),
            };

            res.json({
                success: true,
                data: userResponse,
            });
        } catch (error) {
            next(error);
        }
    }

    async updateProfile(req: AuthRequest, res: Response<ApiResponse>, next: NextFunction) {
        try {
            const { name, email } = req.body;
            const userId = req.user!.id;

            const updatedUser = await userRepository.update(userId, { name, email });

            const userResponse: UserResponse = {
                id: updatedUser.id,
                email: updatedUser.email,
                name: updatedUser.name,
                role: updatedUser.role,
                createdAt: updatedUser.created_at.toISOString(),
                updatedAt: updatedUser.updated_at.toISOString(),
            };

            res.json({
                success: true,
                data: userResponse,
                message: 'Profile updated successfully',
            });
        } catch (error) {
            next(error);
        }
    }

    async logout(req: Request, res: Response<ApiResponse>, next: NextFunction) {
        try {
            // With JWT, logout is handled client-side by removing the token
            res.json({
                success: true,
                message: 'Logout successful',
            });
        } catch (error) {
            next(error);
        }
    }
}

export default new AuthController();
