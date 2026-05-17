import { Router } from 'express';
import { 
    getMyChildren, getChildResults, getChildAttendance, 
    getFamilyFees, getNotices 
} from '../controllers/parent.controller.js';
import { authenticate, authorize } from '../middlewares/auth.js';

const router = Router();

// Protect all parent routes
router.use(authenticate);
router.use(authorize('parent', 'admin'));

router.get('/children', getMyChildren);
router.get('/results', getChildResults);
router.get('/attendance', getChildAttendance);
router.get('/fees', getFamilyFees);
router.get('/notices', getNotices);

export default router;
