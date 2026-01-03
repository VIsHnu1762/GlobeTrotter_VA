import { Router } from 'express';
import { body } from 'express-validator';
import authController from '../controllers/authController.js';
import { authenticate } from '../middleware/auth.js';
import { validate } from '../middleware/validator.js';

const router = Router();

// Register
router.post(
    '/register',
    validate([
        body('email').isEmail().withMessage('Valid email is required'),
        body('password')
            .isLength({ min: 8 })
            .withMessage('Password must be at least 8 characters'),
        body('name').notEmpty().withMessage('Name is required'),
    ]),
    authController.register
);

// Login
router.post(
    '/login',
    validate([
        body('email').isEmail().withMessage('Valid email is required'),
        body('password').notEmpty().withMessage('Password is required'),
    ]),
    authController.login
);

// Get current user
router.get('/me', authenticate, authController.getCurrentUser);

// Update profile
router.put(
    '/profile',
    authenticate,
    validate([
        body('name').optional().notEmpty().withMessage('Name cannot be empty'),
        body('email').optional().isEmail().withMessage('Valid email is required'),
    ]),
    authController.updateProfile
);

// Logout
router.post('/logout', authController.logout);

export default router;
