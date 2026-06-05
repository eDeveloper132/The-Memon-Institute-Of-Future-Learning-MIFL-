import type { Request, Response } from 'express';
import mongoose from 'mongoose';
import { User } from '../schemas/models/user.model.js';
import { Class } from '../schemas/models/class.model.js';
import { Course } from '../schemas/models/course.model.js';
import { Department } from '../schemas/models/department.model.js';
import { Attendance } from '../schemas/models/attendance.model.js';
import { Fee } from '../schemas/models/fee.model.js';
import { Message } from '../schemas/models/message.model.js';
import { Notice } from '../schemas/models/notice.model.js';
import { EnrollmentRequest } from '../schemas/models/enrollmentRequest.model.js';
import { RoleService } from '../services/role.service.js';
import { NotificationService } from '../services/notification.service.js';
import { Assignment, Submission } from '../schemas/models/assignment.model.js';
import { Grade } from '../schemas/models/exam.model.js';
import chalk from 'chalk';

/**
 * ADMIN - USER MANAGEMENT (Students & Teachers)
 */

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const { role, populate } = req.query;
        const query = role ? { role } : {};

        if (role === 'parent') {
            const parents = await User.find({ role: 'parent' }).sort({ createdAt: -1 });
            const parentsWithChildren = await Promise.all(parents.map(async (p) => {
                const children = await User.find({ parent: p._id, role: 'student' }).select('name email studentId');
                return { ...p.toObject(), linkedStudents: children };
            }));
            return res.status(200).json({ users: parentsWithChildren });
        }

        let usersQuery = User.find(query as any);

        if (role === 'student' || populate === 'true') {
            usersQuery = usersQuery
                .populate('currentClass', 'name gradeLevel')
                .populate('parent', 'name email');
        }

        if (role === 'teacher') {
            usersQuery = usersQuery.populate('department', 'name code');
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

            // Populate author for real-time notification
            const populatedNotice = await Notice.findById(notice._id).populate('author', 'name');

            // Broadcast via NotificationService
            await NotificationService.broadcast({
                type: 'NEW_NOTICE',
                title: notice.title,
                content: notice.content,
                data: { 
                    noticeType: notice.type || 'admin',
                    author: (populatedNotice?.author as any)?.name || 'Admin',
                    id: notice._id
                }
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
        
        if (!updatedClass) return res.status(404).json({ message: 'Class not found' });

        // Extract all students who SHOULD be in this class
        const studentIds = new Set<string>();
        
        // From flat students array
        if (req.body.students) {
            req.body.students.forEach((sid: any) => studentIds.add(String(sid)));
        }

        // From batches array
        if (req.body.batches) {
            req.body.batches.forEach((batch: any) => {
                batch.students?.forEach((sid: any) => {
                    const idStr = sid._id || sid;
                    if (idStr) studentIds.add(String(idStr));
                });
            });
        }

        const finalStudentIds = Array.from(studentIds);

        // 1. Unset currentClass for students who were in this class but are no longer listed
        await User.updateMany(
            { currentClass: updatedClass._id, _id: { $nin: finalStudentIds } },
            { $unset: { currentClass: "" } }
        );

        // 2. Set currentClass for students who are now in this class
        if (finalStudentIds.length > 0) {
            await User.updateMany(
                { _id: { $in: finalStudentIds } },
                { currentClass: updatedClass._id }
            );
        }

        res.status(200).json({ message: 'Class updated', class: updatedClass });
    },
    delete: async (req: Request, res: Response) => {
        const { id } = req.params;
        await User.updateMany({ currentClass: id as string }, { $unset: { currentClass: "" } });
        await Class.findByIdAndDelete(id);
        res.status(200).json({ message: 'Class deleted' });
    }
};

export const crudCourses = {
    getAll: async (req: Request, res: Response) => {
        const courses = await Course.find()
            .populate('teacher', 'name')
            .populate('department', 'name')
            .populate('batches.students', 'name email');
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

export const updateCourseBatches = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { batches } = req.body;
        const updatedCourse = await Course.findByIdAndUpdate(id, { batches }, { new: true })
            .populate('teacher', 'name')
            .populate('department', 'name')
            .populate('batches.students', 'name email');
        
        if (!updatedCourse) return res.status(404).json({ message: 'Course not found' });

        res.status(200).json({ message: 'Batches updated', course: updatedCourse });
    } catch (error) {
        console.error('[Admin Controller] updateCourseBatches error:', error);
        res.status(500).json({ message: 'Internal server error' });
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
            
            // Sync HOD user record
            if (department.headOfDepartment) {
                await User.findByIdAndUpdate(department.headOfDepartment, { department: department._id });
            }

            res.status(201).json({ message: 'Department created successfully', department });
        } catch (error: any) {
            if (error.code === 11000) return res.status(400).json({ message: 'Department name or code already exists' });
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    update: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const oldDept = await Department.findById(id);
            const updated = await Department.findByIdAndUpdate(id, req.body, { new: true });
            if (!updated) return res.status(404).json({ message: 'Department not found' });

            // Sync HOD user records if changed
            if (req.body.headOfDepartment && String(oldDept?.headOfDepartment) !== String(req.body.headOfDepartment)) {
                // Remove from old HOD if they don't lead other depts (optional, keeping it simple)
                if (oldDept?.headOfDepartment) {
                    await User.findByIdAndUpdate(oldDept.headOfDepartment, { $unset: { department: "" } });
                }
                // Set for new HOD
                await User.findByIdAndUpdate(req.body.headOfDepartment, { department: updated._id });
            }

            res.status(200).json({ message: 'Department updated successfully', department: updated });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    delete: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const dept = await Department.findById(id);
            if (dept?.headOfDepartment) {
                await User.findByIdAndUpdate(dept.headOfDepartment, { $unset: { department: "" } });
            }
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

        // Extract all students who SHOULD be in this class via batches
        const studentIds = new Set<string>();
        batches.forEach((batch: any) => {
            batch.students?.forEach((sid: any) => {
                const idStr = sid._id || sid;
                if (idStr) studentIds.add(String(idStr));
            });
        });

        // Also include students in the flat list to be safe
        if (updatedClass.students) {
            updatedClass.students.forEach(sid => studentIds.add(String(sid)));
        }

        const finalStudentIds = Array.from(studentIds);

        // 1. Unset currentClass for students who are no longer in any part of this class
        await User.updateMany(
            { currentClass: updatedClass._id, _id: { $nin: finalStudentIds } },
            { $unset: { currentClass: "" } }
        );

        // 2. Set currentClass for students who are in this class
        if (finalStudentIds.length > 0) {
            await User.updateMany(
                { _id: { $in: finalStudentIds } },
                { currentClass: updatedClass._id }
            );
        }

        res.status(200).json({ message: 'Batches updated', class: updatedClass });
    } catch (error) {
        console.error('[Admin Controller] updateClassBatches error:', error);
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

            await NotificationService.broadcast({
                type: 'SYSTEM',
                title: 'New Fee Vouchers Generated',
                content: `New fee vouchers for ${type} (Amount: ${amount}) have been generated. Due date: ${new Date(dueDate).toLocaleDateString()}`,
                data: { type, amount, dueDate }
            });

            return res.status(201).json({ message: `Vouchers generated for ${students.length} students` });
        }

        const fee = await Fee.create({ student: studentId, amount, type, dueDate, status: 'unpaid', remarks });

        await NotificationService.send({
            recipient: new mongoose.Types.ObjectId(studentId) as any,
            type: 'FEE',
            title: 'New Fee Voucher Generated',
            content: `A new fee voucher for ${type} (Amount: ${amount}) has been generated. Due date: ${new Date(dueDate).toLocaleDateString()}`,
            data: { feeId: fee._id, amount, dueDate },
            priority: 'high'
        });

        res.status(201).json({ message: 'Voucher generated', fee });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * PARENT MANAGEMENT
 */
export const linkParentToStudents = async (req: Request, res: Response) => {
    try {
        const { parentId, studentIds } = req.body;
        
        const parent = await User.findById(parentId);
        if (!parent || parent.role !== 'parent') {
            return res.status(404).json({ message: 'Parent account not found' });
        }

        // Update all selected students
        const result = await User.updateMany(
            { _id: { $in: studentIds }, role: 'student' },
            { 
                parent: parent._id,
                parentName: parent.name,
                parentContact: parent.phoneNumber
            }
        );

        res.status(200).json({ 
            message: 'Students successfully linked to parent', 
            updatedCount: result.modifiedCount 
        });
    } catch (error) {
        console.error('[Admin Controller] linkParentToStudents error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * Curriculum & Oversight
 */
export const toggleCurriculumLock = async (req: Request, res: Response) => {
    try {
        const { type, id, isLocked } = req.body;

        if (type === 'course') {
            await Course.findByIdAndUpdate(id, { curriculumLocked: isLocked });
        } else if (type === 'class') {
            await Class.findByIdAndUpdate(id, { classCurriculumLocked: isLocked });
        } else {
            return res.status(400).json({ message: 'Invalid entity type' });
        }

        res.status(200).json({ message: `Curriculum ${isLocked ? 'locked' : 'unlocked'} successfully` });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * ADMIN - ENROLLMENT MANAGEMENT
 */
export const getEnrollmentRequests = async (req: Request, res: Response) => {
    try {
        const requests = await EnrollmentRequest.find({ status: 'pending' })
            .populate('student', 'name email studentId')
            .populate('targetId')
            .sort({ appliedAt: -1 });
        res.status(200).json({ requests });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const processEnrollmentRequest = async (req: any, res: Response) => {
    try {
        const { id } = req.params;
        const { status } = req.body; // 'approved' or 'denied'

        const request = await EnrollmentRequest.findById(id);
        if (!request) return res.status(404).json({ message: 'Request not found' });

        request.status = status;
        request.processedAt = new Date();
        request.processedBy = req.user.id;
        await request.save();

        if (status === 'approved') {
            if (request.targetType === 'Class') {
                await Class.findByIdAndUpdate(request.targetId, {
                    $addToSet: { students: request.student }
                });
                await User.findByIdAndUpdate(request.student, {
                    currentClass: request.targetId
                });

                // Automated Role Transition: User/Applicant -> Student (Active)
                await RoleService.transition({
                    userId: String(request.student),
                    newRole: 'student',
                    trigger: 'ENROLLMENT_APPROVAL',
                    reason: `Approved enrollment for Class ID: ${request.targetId}`,
                    changedBy: req.user.id
                });
            } else {
                await Course.findByIdAndUpdate(request.targetId, {
                    $addToSet: { enrolledStudents: request.student }
                });
            }
        }

        // Notify student via NotificationService
        await NotificationService.send({
            recipient: new mongoose.Types.ObjectId(request.student) as any,
            type: 'ENROLLMENT',
            title: `Enrollment Request ${status === 'approved' ? 'Approved' : 'Denied'}`,
            content: `Your enrollment request for ${request.targetType} has been ${status}.`,
            data: { requestId: request._id, status, targetType: request.targetType, targetId: request.targetId },
            priority: status === 'approved' ? 'high' : 'medium'
        });

        res.status(200).json({ message: `Request ${status}`, request });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateClassFee = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { enrollmentFee } = req.body;
        await Class.findByIdAndUpdate(id, { enrollmentFee });
        res.status(200).json({ message: 'Class fee updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateCourseFee = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { enrollmentFee } = req.body;
        await Course.findByIdAndUpdate(id, { enrollmentFee });
        res.status(200).json({ message: 'Course fee updated successfully' });
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

/**
 * ADMIN - OVERSIGHT AGGREGATORS
 */

export const getStudentOversightData = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const targetId = new mongoose.Types.ObjectId(id as string);
        const student = await User.findById(targetId).populate('currentClass', 'name');
        if (!student) return res.status(404).json({ message: 'Student not found' });

        const [attendance, fees, submissions, grades] = await Promise.all([
            Attendance.find({ student: targetId })
                .populate('course', 'title')
                .populate('class', 'name')
                .sort({ date: -1 }),
            Fee.find({ student: targetId }).sort({ dueDate: -1 }),
            Submission.find({ student: targetId }).populate('assignment', 'title dueDate').sort({ submittedAt: -1 }),
            Grade.find({ student: targetId }).populate({
                path: 'exam',
                populate: { path: 'course', select: 'title' }
            }).sort({ createdAt: -1 })
        ]);

        // Calculate attendance percentage
        const present = attendance.filter((r: any) => r.status === 'present').length;
        const attendancePercentage = attendance.length ? ((present / attendance.length) * 100).toFixed(0) + '%' : '0%';

        res.status(200).json({
            student,
            attendancePercentage,
            attendance,
            fees,
            submissions,
            grades
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getTeacherOversightData = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const targetId = new mongoose.Types.ObjectId(id as string);
        const teacher = await User.findById(targetId).populate('department', 'name');
        if (!teacher) return res.status(404).json({ message: 'Teacher not found' });

        const [classes, courses, assignments] = await Promise.all([
            Class.find({ classTeacher: targetId }),
            Course.find({ teacher: targetId }),
            Assignment.find({ teacher: targetId }).select('_id')
        ]);

        const assignmentIds = assignments.map((a: any) => a._id);
        const pendingGradingCount = await Submission.countDocuments({
            assignment: { $in: assignmentIds },
            status: { $in: ['submitted', 'late'] }
        });

        res.status(200).json({
            teacher,
            stats: {
                classesCount: classes.length,
                coursesCount: courses.length,
                pendingGrading: pendingGradingCount
            },
            classes,
            courses
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getParentOversightData = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const targetId = new mongoose.Types.ObjectId(id as string);
        const parent = await User.findById(targetId);
        if (!parent) return res.status(404).json({ message: 'Parent not found' });

        const children = await User.find({ parent: targetId, role: 'student' }).populate('currentClass', 'name');
        
        const childrenSummaries = await Promise.all(children.map(async (child) => {
            const [attendance, latestGrade] = await Promise.all([
                Attendance.find({ student: child._id }),
                Grade.findOne({ student: child._id }).sort({ createdAt: -1 })
            ]);

            const present = attendance.filter((r: any) => r.status === 'present').length;
            const attendancePct = attendance.length ? ((present / attendance.length) * 100).toFixed(0) + '%' : '0%';

            return {
                student: child,
                summary: {
                    attendance: attendancePct,
                    recentGrade: latestGrade ? latestGrade.obtainedMarks : 'N/A'
                }
            };
        }));

        res.status(200).json({
            parent,
            children: childrenSummaries
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
