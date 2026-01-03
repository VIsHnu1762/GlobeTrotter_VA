import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../types/index.js';

export class AppError extends Error {
    statusCode: number;
    isOperational: boolean;

    constructor(message: string, statusCode: number = 500) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

export const errorHandler = (
    err: Error | AppError,
    req: Request,
    res: Response<ApiResponse>,
    next: NextFunction
) => {
    let statusCode = 500;
    let message = 'Internal server error';

    if (err instanceof AppError) {
        statusCode = err.statusCode;
        message = err.message;
    } else if (err.name === 'ValidationError') {
        statusCode = 400;
        message = err.message;
    } else if (err.name === 'UnauthorizedError') {
        statusCode = 401;
        message = 'Unauthorized';
    }

    console.error('Error:', err);

    res.status(statusCode).json({
        success: false,
        error: message,
    });
};

export const notFoundHandler = (req: Request, res: Response<ApiResponse>) => {
    res.status(404).json({
        success: false,
        error: 'Route not found',
    });
};
