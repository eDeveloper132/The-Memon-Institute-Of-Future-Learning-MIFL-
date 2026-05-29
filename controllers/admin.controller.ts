import type { Request, Response } from 'express';
import { User } from '../schemas/models/user.model.js';
import { Class } from '../schemas/models/class.model.js';
import { Course } from '../schemas/models/course.model.js';
import { Department } from '../schemas/models/department.model.js';
import { Attendance } from '../schemas/models/attendance.model.js';
import { Fee } from '../schemas/models/fee.model.js';
import { Message } from '../schemas/models/message.model.js';
import { Notice } from '../schemas/models/notice.model.js';
import chalk from 'chalk';

/**
 * ADMIN - USER MANAGEMENT (Students & Teachers)
 */

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const { role, populate } = req.query;
        const query = role ? { role } : {};
        let usersQuery = User.find(query as any);

        if (role === 'student' || populate === 'true') {
            usersQuery = usersQuery
                .populate('currentClass', 'name gradeLevel')
                .populate('parent', 'name email');
        }

        const users = await usersQuery.sort({ createdAt: -1 });
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
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Merge updates
        Object.assign(user, req.body);
        
        await user.save();
        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error: any) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Duplicate field error: Email or Student ID already exists' });
        }
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
 * ADMIN - NOTICE MANAGEMENT
 */
export const crudNotices = {
    getAll: async (req: Request, res: Response) => {
        try {
            const notices = await Notice.find().sort({ isPinned: -1, createdAt: -1 });
            res.status(200).json({ notices });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    create: async (req: any, res: Response) => {
        try {
            const notice = await Notice.create({
                ...req.body,
                author: req.user.id
            });

            // Emit via Socket.IO
            req.io.emit('notification', {
                type: 'NEW_NOTICE',
                title: notice.title,
                content: notice.content,
                id: notice._id
            });

            res.status(201).json({ message: 'Notice created successfully', notice });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    update: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const notice = await Notice.findByIdAndUpdate(id, req.body, { new: true });
            if (!notice) return res.status(404).json({ message: 'Notice not found' });
            res.status(200).json({ message: 'Notice updated successfully', notice });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    delete: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            await Notice.findByIdAndDelete(id);
            res.status(200).json({ message: 'Notice deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

/**
 * ADMIN - CLASS & COURSE MANAGEMENT
 */

export const crudClasses = {
    getAll: async (req: Request, res: Response) => {
        const classes = await Class.find()
            .populate('classTeacher', 'name')
            .populate('batches.students', 'name email')
            .sort({ gradeLevel: 1 });
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

export const crudDepartments = {
    getAll: async (req: Request, res: Response) => {
        try {
            const departments = await Department.find().populate('headOfDepartment', 'name').sort({ name: 1 });
            res.status(200).json({ departments });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    create: async (req: Request, res: Response) => {
        try {
            const department = await Department.create(req.body);
            res.status(201).json({ message: 'Department created successfully', department });
        } catch (error: any) {
            if (error.code === 11000) return res.status(400).json({ message: 'Department name or code already exists' });
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    update: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const updated = await Department.findByIdAndUpdate(id, req.body, { new: true });
            if (!updated) return res.status(404).json({ message: 'Department not found' });
            res.status(200).json({ message: 'Department updated successfully', department: updated });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    delete: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            await Department.findByIdAndDelete(id);
            res.status(200).json({ message: 'Department deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

/**
 * ADMIN - ATTENDANCE MANAGEMENT
 */
export const updateClassBatches = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { batches } = req.body;
        const updatedClass = await Class.findByIdAndUpdate(id, { batches }, { new: true })
            .populate('classTeacher', 'name')
            .populate('batches.students', 'name email');
        console.log(chalk.blue('[Admin Controller] updateClassBatches:'), { classId: id, batches });
        if (!updatedClass) return res.status(404).json({ message: 'Class not found' });
        res.status(200).json({ message: 'Batches updated', class: updatedClass });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getSystemAttendance = async (req: Request, res: Response) => {
    try {
        const { role, date } = req.query;
        const queryDate = date ? new Date(date as string) : new Date();
        queryDate.setHours(0, 0, 0, 0);

        // Find users of specific role
        const users = await User.find(role ? { role: role as any } : {});
        const userIds = users.map(u => u._id);

        const records = await Attendance.find({
            student: { $in: userIds },
            date: {
                $gte: queryDate,
                $lt: new Date(queryDate.getTime() + 24 * 60 * 60 * 1000)
            }
        })
        .populate('student', 'name role email studentId')
        .populate('class', 'name')
        .populate('course', 'title')
        .populate('recordedBy', 'name');

        res.status(200).json({ records });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const manualRecordAttendance = async (req: Request, res: Response) => {
    try {
        const { userId, status, checkIn, checkOut, remarks } = req.body;
        
        const attendanceData: any = {
            student: userId,
            status,
            checkIn: checkIn ? new Date(checkIn) : new Date(),
            date: checkIn ? new Date(new Date(checkIn).setHours(0,0,0,0)) : new Date(new Date().setHours(0,0,0,0)),
            remarks,
            recordedBy: (req as any).user.id
        };

        if (checkOut) {
            attendanceData.checkOut = new Date(checkOut);
        }
        
        const record = await Attendance.create(attendanceData);

        res.status(201).json({ message: 'Attendance recorded', record });
    } catch (error) {
        console.error('[Admin Controller] manualRecordAttendance error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateAttendance = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updated = await Attendance.findByIdAndUpdate(id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: 'Attendance record not found' });
        res.status(200).json({ message: 'Attendance updated successfully', record: updated });
    } catch (error) {
        console.error('[Admin Controller] updateAttendance error:', error);
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

        if (!studentId) {
            const students = await User.find({ role: 'student' });
            const operations = students.map(s => ({
                insertOne: {
                    document: { student: s._id, amount, type, dueDate, status: 'unpaid', remarks }
                }
            }));
            
            await Fee.bulkWrite(operations);

            req.io.emit('notification', {
                type: 'GENERAL_FEE_VOUCHER',
                message: `New fee vouchers for ${type} have been generated. Please check your account.`,
                amount,
                dueDate
            });

            return res.status(201).json({ message: `Vouchers generated for ${students.length} students` });
        }

        const fee = await Fee.create({ student: studentId, amount, type, dueDate, status: 'unpaid', remarks });

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
            pendingFeesAmount: pendingFees[0]?.total || 0
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
