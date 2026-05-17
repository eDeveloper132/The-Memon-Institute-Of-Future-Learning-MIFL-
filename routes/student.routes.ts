 import { Router } from 'express';
     import { 
         getMyProfile, updateMyDetails, getMyAttendance, 
         getMyResults, getMyFees 
     } from '../controllers/student.controller.js';
     import { authenticate, authorize } from '../middlewares/auth.js';
    
     const router = Router();
    
    // Protect all student routes
    router.use(authenticate);
    router.use(authorize('student', 'admin'));
   
    router.get('/profile', getMyProfile);
    router.patch('/profile', updateMyDetails);
    router.get('/attendance', getMyAttendance);
    router.get('/results', getMyResults);
    router.get('/fees', getMyFees);
   
    export default router;