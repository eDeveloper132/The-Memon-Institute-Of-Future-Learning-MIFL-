import type { Request, Response } from 'express';
import { User } from '../schemas/models/user.model.js';
import { Class } from '../schemas/models/class.model.js';
import { Course } from '../schemas/models/course.model.js';
import { Attendance } from '../schemas/models/attendance.model.js';
import { Fee } from '../schemas/models/fee.model.js';
import chalk from 'chalk';

/**
 * ADMIN - USER MANAGEMENT (Students & Teachers)
 */

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const { role } = req.query;
        const query = role ? { role: role as string } : {};
        const users = await User.find(query as any).sort({ createdAt: -1 });
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const exists = await User.findOne({ email });
        if (exists) return res.status(400).json({ message: 'User already exists' });

        const user = await User.create(req.body);
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(id, req.body, { new: true });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * ADMIN - CLASS & COURSE MANAGEMENT
 */

export const crudClasses = {
    getAll: async (req: Request, res: Response) => {
        const classes = await Class.find().populate('classTeacher', 'name').sort({ gradeLevel: 1 });
        res.status(200).json({ classes });
    },
    create: async (req: Request, res: Response) => {
        const newClass = await Class.create(req.body);
        res.status(201).json({ message: 'Class created', class: newClass });
    },
    update: async (req: Request, res: Response) => {
        const updated = await Class.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ message: 'Class updated', class: updated });
    },
    delete: async (req: Request, res: Response) => {
        await Class.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Class deleted' });
    }
};

export const crudCourses = {
    getAll: async (req: Request, res: Response) => {
        const courses = await Course.find().populate('teacher', 'name').populate('department', 'name');
        res.status(200).json({ courses });
    },
    create: async (req: Request, res: Response) => {
        const course = await Course.create(req.body);
        res.status(201).json({ message: 'Course created', course });
    },
    update: async (req: Request, res: Response) => {
        const updated = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ message: 'Course updated', course: updated });
    },
    delete: async (req: Request, res: Response) => {
        await Course.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Course deleted' });
    }
};

/**
 * ADMIN - ATTENDANCE MANAGEMENT
 */

export const getSystemAttendance = async (req: Request, res: Response) => {
    try {
        const { role, date } = req.query;
        const queryDate = date ? new Date(date as string) : new Date();
        queryDate.setHours(0, 0, 0, 0);

        // Find users of specific role
        const users = await User.find(role ? { role: role as any } : {});
        const userIds = users.map(u => u._id);

        const records = await Attendance.find({
            student: { $in: userIds }, // 'student' field in model is used for any user attendance
            date: {
                $gte: queryDate,
                $lt: new Date(queryDate.getTime() + 24 * 60 * 60 * 1000)
            }
        }).populate('student', 'name role');

        res.status(200).json({ records });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * ADMIN - FINANCIAL MANAGEMENT
 */

export const getPendingFees = async (req: Request, res: Response) => {
    try {
        const pending = await Fee.find({ status: { $ne: 'paid' } }).populate('student', 'name email');
        res.status(200).json({ pending });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * ADMIN - STATS
 */
export const getAdminStats = async (req: Request, res: Response) => {
    try {
        const [totalStudents, totalTeachers, totalClasses, pendingFees] = await Promise.all([
            User.countDocuments({ role: 'student' }),
            User.countDocuments({ role: 'teacher' }),
            Class.countDocuments(),
            Fee.aggregate([
                { $match: { status: { $ne: 'paid' } } },
                { $group: { _id: null, total: { $sum: '$amount' } } }
            ])
        ]);

        res.status(200).json({
            totalStudents,
            totalTeachers,
            totalClasses,
            activeBatches: 5, // Placeholder until Batch model
            pendingFeesAmount: pendingFees[0]?.total || 0
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
