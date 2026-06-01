import type { Request, Response } from 'express';
import { User } from '../schemas/models/user.model.js';
import { Attendance } from '../schemas/models/attendance.model.js';
import { Fee } from '../schemas/models/fee.model.js';
import { Grade } from '../schemas/models/exam.model.js';
import { Notice } from '../schemas/models/notice.model.js';
import { Message } from '../schemas/models/message.model.js';
import chalk from 'chalk';

/**
 * Helper to verify if a student belongs to the parent
 */
const verifyChild = async (parentId: string, childId: string) => {
    const student = await User.findOne({ _id: childId, parent: parentId, role: 'student' });
    return !!student;
};

/**
 * PARENT - CHILDREN OVERSIGHT
 */
export const getMyChildren = async (req: any, res: Response) => {
    try {
        // Find all students that have this parent ID linked
        const children = await User.find({ parent: req.user.id, role: 'student' })
            .populate('currentClass', 'name');
        res.status(200).json({ children });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * PARENT - ACADEMIC RESULTS
 */
export const getChildResults = async (req: any, res: Response) => {
    try {
        const { childId } = req.query;
        if (!childId) return res.status(400).json({ message: 'Child ID is required' });

        const isAuthorized = await verifyChild(req.user.id, childId);
        if (!isAuthorized) return res.status(403).json({ message: 'Unauthorized access to student record' });

        const results = await Grade.find({ student: childId }).populate({
            path: 'exam',
            populate: { path: 'course', select: 'title' }
        });
        res.status(200).json({ results });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * PARENT - ATTENDANCE TRACKING
 */
export const getChildAttendance = async (req: any, res: Response) => {
    try {
        const { childId, month } = req.query; // month format: YYYY-MM
        if (!childId) return res.status(400).json({ message: 'Child ID is required' });

        const isAuthorized = await verifyChild(req.user.id, childId);
        if (!isAuthorized) return res.status(403).json({ message: 'Unauthorized access' });

        let query: any = { student: childId };

        if (month) {
            const start = new Date(month + '-01');
            const end = new Date(start);
            end.setMonth(end.getMonth() + 1);
            query.date = { $gte: start, $lt: end };
        }

        const records = await Attendance.find(query).sort({ date: 1 });
        res.status(200).json({ records });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * PARENT - FINANCIAL OVERSIGHT
 */
export const getFamilyFees = async (req: any, res: Response) => {
    try {
        const children = await User.find({ parent: req.user.id, role: 'student' });
        const childIds = children.map(c => c._id);

        const fees = await Fee.find({ student: { $in: childIds } })
            .populate('student', 'name')
            .sort({ dueDate: -1 });

        res.status(200).json({ fees });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * PARENT - COMMUNICATION
 */
export const getNotices = async (req: any, res: Response) => {
    try {
        console.log(`[Parent Controller] Fetching notices for user: ${req.user?.id} [${req.user?.role}]`);
        const now = new Date();
        const notices = await Notice.find({ 
            audience: { $in: ['all', 'parents'] },
            $or: [{ expiryDate: { $exists: false } }, { expiryDate: { $gte: now } }] 
        }).sort({ isPinned: -1, createdAt: -1 });
        
        console.log(`[Parent Controller] Found ${notices.length} notices`);
        res.status(200).json({ notices });
    } catch (error) {
        console.error(chalk.red('[Parent Controller] getNotices error:'), error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
