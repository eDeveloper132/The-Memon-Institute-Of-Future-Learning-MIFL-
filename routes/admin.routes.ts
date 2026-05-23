import { Router } from 'express';
import { 
    getAllUsers, createUser, updateUser, deleteUser,
    crudClasses, crudCourses, crudBatches,
    getSystemAttendance, getPendingFees, getAdminStats,
    generateFeeVoucher,
    getAdminChatHistory, getAdminConversations, sendAdminMessage
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

/**
 * Batch Management
 */
router.get('/batches', crudBatches.getAll);
router.post('/batches', crudBatches.create);
router.patch('/batches/:id', crudBatches.update);
router.delete('/batches/:id', crudBatches.delete);

/**
 * Attendance Oversight
 */
router.get('/attendance', getSystemAttendance);

/**
 * Financial Oversight
 */
router.get('/fees', getPendingFees);
router.post('/fees/generate', generateFeeVoucher);

/**
 * Messaging Oversight
 */
router.get('/messages', getAdminChatHistory);
router.get('/conversations', getAdminConversations);
router.post('/messages', sendAdminMessage);

export default router;
