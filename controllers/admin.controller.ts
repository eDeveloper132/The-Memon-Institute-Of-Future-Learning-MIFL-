import type { Request, Response } from 'express';
import { User } from '../schemas/models/user.model.js';
import { Class } from '../schemas/models/class.model.js';
import { Course } from '../schemas/models/course.model.js';
import { Attendance } from '../schemas/models/attendance.model.js';
import { Fee } from '../schemas/models/fee.model.js';
import { Batch } from '../schemas/models/batch.model.js';
import { Message } from '../schemas/models/message.model.js';
import chalk from 'chalk';

/**
 * ADMIN - USER MANAGEMENT (Students & Teachers)
 */

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const { role } = req.query;
        const query = role ? { role } : {};
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
        const updatedClass = await Class.findByIdAndUpdate(req.params.id, req.body, { new: true });
        
        // Sync the currentClass field for all assigned students
        if (req.body.students && updatedClass) {
            await User.updateMany({ _id: { $in: req.body.students } }, { currentClass: updatedClass._id });
        }

        res.status(200).json({ message: 'Class updated', class: updatedClass });
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
 * ADMIN - BATCH MANAGEMENT
 */
export const crudBatches = {
    getAll: async (req: Request, res: Response) => {
        const batches = await Batch.find().sort({ startYear: -1 });
        res.status(200).json({ batches });
    },
    create: async (req: Request, res: Response) => {
        const batch = await Batch.create(req.body);
        res.status(201).json({ message: 'Batch created', batch });
    },
    update: async (req: Request, res: Response) => {
        const updated = await Batch.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ message: 'Batch updated', batch: updated });
    },
    delete: async (req: Request, res: Response) => {
        await Batch.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Batch deleted' });
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

export const generateFeeVoucher = async (req: Request, res: Response) => {
    try {
        const { studentId, amount, type, dueDate, remarks } = req.body;

        // If no specific student, generate for ALL students
        if (!studentId) {
            const students = await User.find({ role: 'student' });
            const operations = students.map(s => ({
                insertOne: {
                    document: { student: s._id, amount, type, dueDate, status: 'unpaid', remarks }
                }
            }));
            
            await Fee.bulkWrite(operations);

            // Notify all students about new fee vouchers
            req.io.emit('notification', {
                type: 'GENERAL_FEE_VOUCHER',
                message: `New fee vouchers for ${type} have been generated. Please check your account.`,
                amount,
                dueDate
            });

            return res.status(201).json({ message: `Vouchers generated for ${students.length} students` });
        }

        // Single student voucher
        const fee = await Fee.create({ student: studentId, amount, type, dueDate, status: 'unpaid', remarks });

        // Notify specific student
        req.io.to(String(studentId)).emit('notification', {
            type: 'SINGLE_FEE_VOUCHER',
            message: `A new fee voucher for ${type} (Amount: ${amount}) has been generated.`,
            feeId: fee._id,
            dueDate
        });

        res.status(201).json({ message: 'Voucher generated', fee });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * ADMIN - STATS
 */
export const getAdminStats = async (req: Request, res: Response) => {
    try {
        const [totalStudents, totalTeachers, totalClasses, activeBatches, pendingFees] = await Promise.all([
            User.countDocuments({ role: 'student' }),
            User.countDocuments({ role: 'teacher' }),
            Class.countDocuments(),
            Batch.countDocuments({ isActive: true }),
            Fee.aggregate([
                { $match: { status: { $ne: 'paid' } } },
                { $group: { _id: null, total: { $sum: '$amount' } } }
            ])
        ]);

        res.status(200).json({
            totalStudents,
            totalTeachers,
            totalClasses,
            activeBatches,
            pendingFeesAmount: pendingFees[0]?.total || 0
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * ADMIN - MESSAGING
 */
export const getAdminChatHistory = async (req: any, res: Response) => {
    try {
        const { partnerId } = req.query;
        if (!partnerId) return res.status(400).json({ message: 'Partner ID is required' });

        const messages = await Message.find({
            $or: [
                { sender: req.user.id, receiver: partnerId },
                { sender: partnerId, receiver: req.user.id }
            ]
        }).sort({ createdAt: 1 });

        res.status(200).json({ messages });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getAdminConversations = async (req: any, res: Response) => {
    try {
        const messages = await Message.find({
            $or: [{ sender: req.user.id }, { receiver: req.user.id }]
        }).sort({ createdAt: -1 });

        const partnerIds = new Set();
        messages.forEach(m => {
            const partnerId = m.sender.toString() === req.user.id ? m.receiver.toString() : m.sender.toString();
            partnerIds.add(partnerId);
        });

        const partners = await User.find({ _id: { $in: Array.from(partnerIds) } } as any).select('name role profilePicture');
        res.status(200).json({ partners });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const sendAdminMessage = async (req: any, res: Response) => {
    try {
        const { receiver, content } = req.body;
        const sender = req.user.id;

        const newMessage = await Message.create({
            sender,
            receiver,
            content
        });

        // Emit via Socket.IO
        req.io.to(receiver).emit('receiveMessage', newMessage);
        req.io.to(sender).emit('messageSent', newMessage);

        res.status(201).json({ message: 'Message sent successfully', newMessage });
    } catch (error) {
        console.error(chalk.red('[Admin Controller] sendAdminMessage error:'), error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
