import { Router } from 'express';
import { 
    getAllUsers, createUser, updateUser, deleteUser,
    crudClasses, crudCourses, crudNotices, crudDepartments,
    getSystemAttendance, manualRecordAttendance, updateAttendance, getPendingFees, getAdminStats,
    generateFeeVoucher, updateClassBatches
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
 * User Management (Students, Teachers)
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

router.patch('/classbatches/:id', updateClassBatches);

/**
 * Department Management
 */
router.get('/departments', crudDepartments.getAll);
router.post('/departments', crudDepartments.create);
router.patch('/departments/:id', crudDepartments.update);
router.delete('/departments/:id', crudDepartments.delete);

/**
 * Notice Management
 */
router.get('/notices', crudNotices.getAll);
router.post('/notices', crudNotices.create);
router.patch('/notices/:id', crudNotices.update);
router.delete('/notices/:id', crudNotices.delete);

/**
 * Attendance Oversight
 */
router.get('/attendance', getSystemAttendance);
router.post('/attendance', manualRecordAttendance);
router.patch('/attendance/:id', updateAttendance);

/**
 * Financial Oversight
 */
router.get('/fees', getPendingFees);
router.post('/fees/generate', generateFeeVoucher);

export default router;
