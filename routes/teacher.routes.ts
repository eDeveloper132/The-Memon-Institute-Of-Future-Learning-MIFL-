import { Router } from 'express';
import { 
    getDashboardStats, 
    getAttendanceData, 
    markAttendance, 
    createAssignment,
    getAssignments,
    gradeSubmission,
    uploadMaterial,
    getMaterials,
    createQuiz,
    getQuizzes,
    getExamsAndGrades 
} from '../controllers/teacher.controller.js';
import { authenticate, authorize } from '../middlewares/auth.js';

const router = Router();

// All teacher routes require authentication and teacher/admin role
router.use(authenticate);
router.use(authorize('teacher', 'admin'));

/**
 * Teacher Dashboard
 */
router.get('/stats', getDashboardStats);

/**
 * Attendance
 */
router.get('/attendance', getAttendanceData);
router.post('/attendance', markAttendance);

/**
 * Assignments
 */
router.get('/assignments', getAssignments);
router.post('/assignments', createAssignment);
router.patch('/assignments/grade/:submissionId', gradeSubmission);

/**
 * Materials
 */
router.get('/materials', getMaterials);
router.post('/materials', uploadMaterial);

/**
 * Quizzes
 */
router.get('/quizzes', getQuizzes);
router.post('/quizzes', createQuiz);

/**
 * Results
 */
router.get('/results', getExamsAndGrades);

export default router;
