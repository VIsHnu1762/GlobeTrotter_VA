import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain } from 'express-validator';
import { ApiResponse } from '../types/index.js';

export const validate = (validations: ValidationChain[]) => {
    return async (req: Request, res: Response<ApiResponse>, next: NextFunction) => {
        for (const validation of validations) {
            await validation.run(req);
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                error: 'Validation failed',
                data: errors.array(),
            });
        }

        next();
    };
};
