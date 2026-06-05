import type { Request, Response } from 'express';
import { Class } from '../schemas/models/class.model.js';
import { Course } from '../schemas/models/course.model.js';
import { User } from '../schemas/models/user.model.js';
import { EnrollmentRequest } from '../schemas/models/enrollmentRequest.model.js';
import { NotificationService } from '../services/notification.service.js';
import chalk from 'chalk';

/**
 * Get available classes and courses for a student
 */
export const getAvailableOpportunities = async (req: any, res: Response) => {
    try {
        const studentId = req.user.id;
        
        // Find student to check current class
        const student = await User.findById(studentId);
        
        const [classes, courses, requests] = await Promise.all([
            Class.find().select('name gradeLevel section enrollmentFee classTeacher').populate('classTeacher', 'name'),
            Course.find().select('title code department enrollmentFee teacher').populate('teacher', 'name'),
            EnrollmentRequest.find({ student: studentId, status: 'pending' })
        ]);

        const requestMap = new Map(requests.map(r => [r.targetId.toString(), r]));

        const formatItem = (item: any) => {
            const idStr = item._id.toString();
            const request = requestMap.get(idStr);
            return {
                ...item.toObject(),
                requestId: request?._id || null,
                enrollmentStatus: request ? 'pending' : (student?.currentClass?.toString() === idStr || item.enrolledStudents?.includes(studentId) ? 'enrolled' : 'none')
            };
        };

        res.status(200).json({
            classes: classes.map(formatItem),
            courses: courses.map(formatItem)
        });
    } catch (error) {
        console.error(chalk.red('[Enrollment Controller] getAvailableOpportunities error:'), error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * Apply for enrollment
 */
export const applyForEnrollment = async (req: any, res: Response) => {
    try {
        const studentId = req.user.id;
        const { targetType, targetId } = req.body;

        if (targetType === 'Class') {
            const student = await User.findById(studentId);
            if (student?.currentClass) {
                return res.status(400).json({ message: 'Already enrolled in a class' });
            }
            
            const existingPending = await EnrollmentRequest.findOne({ 
                student: studentId, 
                targetType: 'Class', 
                status: 'pending' 
            });
            if (existingPending) {
                return res.status(400).json({ message: 'You already have a pending class application' });
            }
        }

        let target;
        if (targetType === 'Class') target = await Class.findById(targetId);
        else target = await Course.findById(targetId);

        if (!target) return res.status(404).json({ message: `${targetType} not found` });

        const request = await EnrollmentRequest.create({
            student: studentId,
            targetType,
            targetId,
            feeAtTimeOfApplication: (target as any).enrollmentFee || 0
        });

        // Notify admins via NotificationService broadcast
        await NotificationService.broadcast({
            type: 'ENROLLMENT_REQUEST',
            title: 'New Enrollment Request',
            content: `New enrollment request for ${targetType}: ${(target as any).name || (target as any).title}`,
            data: { requestId: request._id, studentId }
        });

        res.status(201).json({ message: 'Application submitted successfully', request });
    } catch (error) {
        console.error(chalk.red('[Enrollment Controller] applyForEnrollment error:'), error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * Cancel pending request
 */
export const cancelEnrollmentRequest = async (req: any, res: Response) => {
    try {
        const { id } = req.params;
        const studentId = req.user.id;

        const request = await EnrollmentRequest.findOne({ _id: id, student: studentId, status: 'pending' });
        if (!request) return res.status(404).json({ message: 'Request not found' });

        request.status = 'cancelled';
        await request.save();

        res.status(200).json({ message: 'Application cancelled successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
