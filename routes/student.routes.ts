import { Router } from 'express';
import { 
    getMyProfile, 
    updateMyDetails, 
    getMyAttendance, 
    getMyResults, 
    getMyFees,
    getMyAssignments,
    submitAssignment,
    getMyMaterials,
    getAvailableQuizzes,
    attemptQuiz,
    enrollCourse,
    getStudentChatHistory, getStudentConversations, sendStudentMessage,
    getMyNotices,
    getMyRoadmaps
} from '../controllers/student.controller.js';
import { authenticate, authorize } from '../middlewares/auth.js';
import { generalLimiter } from '../middlewares/rateLimiter.js';

const router = Router();

// Protect all student routes
router.use(authenticate);
router.use(authorize('student', 'admin'));
router.use(generalLimiter);

router.get('/profile', getMyProfile);
router.patch('/profile', updateMyDetails);
router.get('/attendance', getMyAttendance);
router.get('/results', getMyResults);
router.get('/fees', getMyFees);
router.get('/notices', getMyNotices);
router.get('/roadmaps', getMyRoadmaps);
router.post('/enroll/:courseId', enrollCourse);

/**
 * Academic
 */
router.get('/assignments', getMyAssignments);
router.post('/assignments/:assignmentId', submitAssignment);
router.get('/materials', getMyMaterials);
router.get('/quizzes', getAvailableQuizzes);
router.post('/quizzes/:quizId', attemptQuiz);

/**
 * Messaging
 */
router.get('/messages', getStudentChatHistory);
router.get('/conversations', getStudentConversations);
router.post('/messages', sendStudentMessage);

export default router;
