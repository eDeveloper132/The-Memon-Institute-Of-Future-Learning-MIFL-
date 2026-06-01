import { Router } from 'express';
import { 
    getAvailableOpportunities, 
    applyForEnrollment, 
    cancelEnrollmentRequest 
} from '../controllers/enrollment.controller.js';
import { authenticate, authorize } from '../middlewares/auth.js';

const router = Router();

// Student Enrollment Routes
router.get('/available', authenticate, authorize('student'), getAvailableOpportunities);
router.post('/apply', authenticate, authorize('student'), applyForEnrollment);
router.patch('/requests/:id/cancel', authenticate, authorize('student'), cancelEnrollmentRequest);

export default router;
