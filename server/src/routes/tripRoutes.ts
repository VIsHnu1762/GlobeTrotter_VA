import { Router } from 'express';
import { body } from 'express-validator';
import tripController from '../controllers/tripController.js';
import { authenticate } from '../middleware/auth.js';
import { validate } from '../middleware/validator.js';

const router = Router();

// Get all trips for current user
router.get('/', authenticate, tripController.getMyTrips);

// Get shared trip by token (public)
router.get('/shared/:token', tripController.getSharedTrip);

// Get trip by ID
router.get('/:id', authenticate, tripController.getTripById);

// Create trip
router.post(
    '/',
    authenticate,
    validate([
        body('title').notEmpty().withMessage('Title is required'),
        body('start_date').isISO8601().withMessage('Valid start date is required'),
        body('end_date').isISO8601().withMessage('Valid end date is required'),
    ]),
    tripController.createTrip
);

// Update trip
router.put(
    '/:id',
    authenticate,
    validate([
        body('title').optional().notEmpty().withMessage('Title cannot be empty'),
        body('start_date').optional().isISO8601().withMessage('Valid start date required'),
        body('end_date').optional().isISO8601().withMessage('Valid end date required'),
    ]),
    tripController.updateTrip
);

// Delete trip
router.delete('/:id', authenticate, tripController.deleteTrip);

// Generate share link
router.post('/:id/share', authenticate, tripController.generateShareLink);

export default router;
