     import { Router } from 'express';
     import { getDashboardStats, getAttendanceData, markAttendance, getAssignments,
      getExamsAndGrades } from '../controllers/teacher.controller.js';
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
   
    /**
     * Results
     */
    router.get('/results', getExamsAndGrades);
   
    export default router;