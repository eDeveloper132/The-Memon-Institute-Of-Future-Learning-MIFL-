import { Router } from 'express';
import { 
    getDashboardStats, 
    getTeacherCourses,
    getTeacherClasses,
    getAttendanceData, 
    getAttendanceStats,
    markAttendance, 
    createAssignment,
    getAssignments,
    updateAssignment,
    deleteAssignment,
    gradeSubmission,
    getSubmissionsForAssignment,
    getStudentSummary,
    uploadMaterial,
    getMaterials,
    updateCourseCurriculum,
    updateClassCurriculum,
    createQuiz,
    getQuizzes,
    createExam,
    recordGrade,
    getExamsAndGrades,
    getTeacherNotices,
    createNotice,
    deleteNotice,
    getTeacherChatHistory, getTeacherConversations, sendTeacherMessage
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
router.get('/courses', getTeacherCourses);
router.get('/classes', getTeacherClasses);
router.get('/students/:studentId/summary', getStudentSummary);

/**
 * Attendance
 */
router.get('/attendance', getAttendanceData);
router.get('/attendance/stats', getAttendanceStats);
router.post('/attendance', markAttendance);

/**
 * Assignments
 */
router.get('/assignments', getAssignments);
router.get('/assignments/:id/submissions', getSubmissionsForAssignment);
router.post('/assignments', createAssignment);
router.patch('/assignments/:id', updateAssignment);
router.delete('/assignments/:id', deleteAssignment);
router.patch('/assignments/grade/:submissionId', gradeSubmission);

/**
 * Materials & Curriculum
 */
router.get('/materials', getMaterials);
router.post('/materials', uploadMaterial);
router.patch('/courses/:id/curriculum', updateCourseCurriculum);
router.patch('/classes/:id/curriculum', updateClassCurriculum);

/**
 * Quizzes
 */
router.get('/quizzes', getQuizzes);
router.post('/quizzes', createQuiz);

/**
 * Results & Exams
 */
router.post('/exams', createExam);
router.post('/grades', recordGrade);
router.get('/results', getExamsAndGrades);

/**
 * Notices
 */
router.get('/notices', getTeacherNotices);
router.post('/notices', createNotice);
router.delete('/notices/:id', deleteNotice);

/**
 * Messaging
 */
router.get('/messages', getTeacherChatHistory);
router.get('/conversations', getTeacherConversations);
router.post('/messages', sendTeacherMessage);

export default router;
