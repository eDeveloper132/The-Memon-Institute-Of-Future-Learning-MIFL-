import { Router } from 'express';
import { 
    getAllUsers, createUser, updateUser, deleteUser,
    crudClasses, crudCourses, 
    getSystemAttendance, getPendingFees, getAdminStats 
} from '../controllers/admin.controller.js';
import { authenticate, authorize } from '../middlewares/auth.js';

const router = Router();

// Protect all admin routes
router.use(authenticate);
router.use(authorize('admin'));

/**
 * Dashboard Stats
 */
router.get('/stats', getAdminStats);

/**
 * User Management (Students, Teachers, Staff)
 */
router.get('/users', getAllUsers);
router.post('/users', createUser);
router.patch('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

/**
 * Class Management
 */
router.get('/classes', crudClasses.getAll);
router.post('/classes', crudClasses.create);
router.patch('/classes/:id', crudClasses.update);
router.delete('/classes/:id', crudClasses.delete);

/**
 * Course Management
 */
router.get('/courses', crudCourses.getAll);
router.post('/courses', crudCourses.create);
router.patch('/courses/:id', crudCourses.update);
router.delete('/courses/:id', crudCourses.delete);

/**
 * Attendance Oversight
 */
router.get('/attendance', getSystemAttendance);

/**
 * Financial Oversight
 */
router.get('/fees', getPendingFees);

export default router;
