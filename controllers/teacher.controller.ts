import type { Request, Response } from 'express';
import { User } from '../schemas/models/user.model.js';
import { Class } from '../schemas/models/class.model.js';
import { Attendance } from '../schemas/models/attendance.model.js';
import { Course } from '../schemas/models/course.model.js';
import { Exam, Grade } from '../schemas/models/exam.model.js';
import { Assignment, Submission } from '../schemas/models/assignment.model.js';
import { Quiz } from '../schemas/models/quiz.model.js';
import { Material } from '../schemas/models/material.model.js';
import { Message } from '../schemas/models/message.model.js';
import { Notice } from '../schemas/models/notice.model.js';
import chalk from 'chalk';

/**
 * Teacher Dashboard Stats
 */
export const getDashboardStats = async (req: any, res: Response) => {
    try {
        const teacherId = req.user.id;

        // Get count of classes where this user is the class teacher
        const classesCount = await Class.countDocuments({ classTeacher: teacherId });

        // Get count of students across all classes taught by this teacher
        const classes = await Class.find({ classTeacher: teacherId });
        const studentIds = new Set();
        classes.forEach(cls => cls.students.forEach(id => studentIds.add(id.toString())));
        const totalStudents = studentIds.size;

        // Get pending grading (Assignments & Exams)
        const [pendingAssignments, pendingExams] = await Promise.all([
            Submission.countDocuments({ status: 'submitted' }),
            Grade.countDocuments({ grade: { $exists: false } }) // Simplified logic
        ]);

        res.status(200).json({
            classesCount,
            totalStudents,
            pendingGrading: pendingAssignments + pendingExams,
            avgFeedback: "4.8/5" // Placeholder
        });
    } catch (error: any) {
        console.error(chalk.red('Get Dashboard Stats error:'), error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * Attendance Logic
 */
export const getTeacherCourses = async (req: any, res: Response) => {
    try {
        const teacherId = req.user.id;
        const courses = await Course.find({ teacher: teacherId }).select('title batches');
        res.status(200).json({ courses });
    } catch (error: any) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getTeacherClasses = async (req: any, res: Response) => {
    try {
        const teacherId = req.user.id;
        const classes = await Class.find({ classTeacher: teacherId }).select('name section gradeLevel students');
        res.status(200).json({ classes });
    } catch (error: any) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getAttendanceData = async (req: any, res: Response) => {
    try {
        const { classId, courseId, batchId, date } = req.query;
        if (!classId && !courseId) return res.status(400).json({ message: 'Class or Course ID is required' });

        let students: any[] = [];
        const queryDate = date ? new Date(date as string) : new Date();
        queryDate.setHours(0, 0, 0, 0);

        if (classId) {
            const selectedClass = await Class.findById(classId).populate('students', 'name email');
            if (!selectedClass) return res.status(404).json({ message: 'Class not found' });
            students = selectedClass.students;
        } else if (courseId && batchId) {
            const selectedCourse = await Course.findById(courseId);
            if (!selectedCourse) return res.status(404).json({ message: 'Course not found' });
            
            const batch = selectedCourse.batches.find(b => String(b._id) === String(batchId));
            if (!batch) return res.status(404).json({ message: 'Batch not found' });

            students = await User.find({ _id: { $in: batch.students } }).select('name email');
        }

        const records = await Attendance.find({
            ...(classId ? { class: classId } : { course: courseId }),
            date: {
                $gte: queryDate,
                $lt: new Date(queryDate.getTime() + 24 * 60 * 60 * 1000)
            }
        });

        res.status(200).json({
            students,
            records
        });
    } catch (error: any) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const markAttendance = async (req: any, res: Response) => {
    try {
        const { classId, courseId, attendanceData, date } = req.body; 
        const recordedBy = req.user.id;

        const dateObj = date ? new Date(date) : new Date();
        dateObj.setHours(0, 0, 0, 0);

        const operations = attendanceData.map((item: any) => ({
            updateOne: {
                filter: { 
                    student: item.studentId, 
                    ...(classId ? { class: classId } : { course: courseId }), 
                    date: dateObj 
                },
                update: { status: item.status, recordedBy },
                upsert: true
            }
        }));

        await Attendance.bulkWrite(operations);

        // Notify relevant room
        const room = classId ? `class:${classId}` : `course:${courseId}`;
        req.io.to(room).emit('notification', {
            type: 'ATTENDANCE_MARKED',
            message: `Attendance for ${dateObj.toLocaleDateString()} has been recorded.`,
            id: classId || courseId
        });

        res.status(200).json({ message: 'Attendance recorded successfully' });
    } catch (error: any) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * Assignment Management
 */
export const createAssignment = async (req: any, res: Response) => {
    try {
        const { title, description, course, class: classId, batch, dueDate, maxPoints } = req.body;
        
        const assignment = await Assignment.create({
            title,
            description,
            course,
            class: classId || undefined,
            batch: batch || undefined,
            teacher: req.user.id,
            dueDate,
            maxPoints
        });

        // Notify relevant room
        // If batch is targeted, we still notify the course room but include batch metadata
        // Students in the course room will filter based on their own batch enrollment
        const room = classId ? `class:${classId}` : `course:${course}`;
        
        req.io.to(room).emit('notification', {
            type: 'NEW_ASSIGNMENT',
            message: `A new assignment "${assignment.title}" has been posted.`,
            assignmentId: assignment._id,
            batchId: batch || null
        });

        res.status(201).json({ message: 'Assignment created successfully', assignment });
    } catch (error) {
        console.error('[Teacher Controller] createAssignment error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateAssignment = async (req: any, res: Response) => {
    try {
        const { id } = req.params;
        const { title, description, course, class: classId, batch, dueDate, maxPoints } = req.body;
        
        const assignment = await Assignment.findById(id);
        if (!assignment) return res.status(404).json({ message: 'Assignment not found' });
        if (String(assignment.teacher) !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        const updated = await Assignment.findByIdAndUpdate(id, {
            title,
            description,
            course,
            class: classId || undefined,
            batch: batch || undefined,
            dueDate,
            maxPoints
        }, { new: true });

        res.status(200).json({ message: 'Assignment updated successfully', assignment: updated });
    } catch (error) {
        console.error('[Teacher Controller] updateAssignment error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteAssignment = async (req: any, res: Response) => {
    try {
        const { id } = req.params;
        const assignment = await Assignment.findById(id);
        if (!assignment) return res.status(404).json({ message: 'Assignment not found' });
        if (String(assignment.teacher) !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        await Assignment.findByIdAndDelete(id);
        // Also delete related submissions
        await Submission.deleteMany({ assignment: id });

        res.status(200).json({ message: 'Assignment deleted successfully' });
    } catch (error) {
        console.error('[Teacher Controller] deleteAssignment error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getAssignments = async (req: any, res: Response) => {
    try {
        const assignments = await Assignment.find({ teacher: req.user.id })
            .populate('course', 'title batches')
            .populate('class', 'name');
        res.status(200).json({ assignments });
    } catch (error: any) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const gradeSubmission = async (req: any, res: Response) => {
    try {
        const { submissionId } = req.params;
        const { grade, feedback } = req.body;

        const submission = await Submission.findByIdAndUpdate(
            submissionId,
            { grade, feedback, status: 'graded', gradedBy: req.user.id },
            { new: true }
        );

        if (submission) {
            // Notify student about graded submission
            req.io.to(String(submission.student)).emit('notification', {
                type: 'ASSIGNMENT_GRADED',
                message: `Your submission for an assignment has been graded.`,
                submissionId: submission._id
            });
        }

        res.status(200).json({ message: 'Submission graded', submission });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * Material Management
 */
export const uploadMaterial = async (req: any, res: Response) => {
    try {
        const material = await Material.create({
            ...req.body,
            teacher: req.user.id
        });
        res.status(201).json({ message: 'Material uploaded', material });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getMaterials = async (req: any, res: Response) => {
    try {
        const materials = await Material.find({ teacher: req.user.id }).populate('course', 'title');
        res.status(200).json({ materials });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * Quiz Management
 */
export const createQuiz = async (req: any, res: Response) => {
    try {
        const quiz = await Quiz.create({
            ...req.body,
            teacher: req.user.id
        });
        res.status(201).json({ message: 'Quiz created', quiz });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getQuizzes = async (req: any, res: Response) => {
    try {
        const quizzes = await Quiz.find({ teacher: req.user.id }).populate('course', 'title');
        res.status(200).json({ quizzes });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * Result & Exam Management
 */
export const createExam = async (req: any, res: Response) => {
    try {
        // Ensure the teacher owns the course
        const course = await Course.findOne({ _id: req.body.course, teacher: req.user.id });
        if (!course) return res.status(403).json({ message: 'Not authorized for this course' });

        const exam = await Exam.create(req.body);
        res.status(201).json({ message: 'Exam created', exam });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const recordGrade = async (req: any, res: Response) => {
    try {
        const { examId, studentId, obtainedMarks, remarks } = req.body;
        
        // Verify teacher owns the exam's course
        const exam: any = await Exam.findById(examId).populate('course');
        if (!exam || String(exam.course.teacher) !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized grading attempt' });
        }

        const grade = await Grade.findOneAndUpdate(
            { exam: examId, student: studentId },
            { 
                obtainedMarks, 
                feedback: remarks, 
                gradedBy: req.user.id 
            },
            { new: true, upsert: true, runValidators: true }
        );

        // Notify student about new grade
        req.io.to(String(studentId)).emit('notification', {
            type: 'EXAM_GRADE_RECORDED',
            message: `A new grade has been recorded for your exam: ${exam.title}`,
            examId: exam._id
        });

        res.status(200).json({ message: 'Grade recorded', grade });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getExamsAndGrades = async (req: any, res: Response) => {
    try {
        const teacherId = req.user.id;
        const courses = await Course.find({ teacher: teacherId });
        const courseIds = courses.map(c => c._id);

        const exams = await Exam.find({ course: { $in: courseIds } });
        const grades = await Grade.find({ exam: { $in: exams.map(e => e._id) } }).populate('student', 'name');
        
        res.status(200).json({ exams, grades });
    } catch (error: any) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * TEACHER - NOTICES
 */
export const getTeacherNotices = async (req: any, res: Response) => {
    try {
        const now = new Date();
        const query: any = {
            $and: [
                { audience: { $in: ['all', 'teachers'] } },
                { $or: [{ expiryDate: { $exists: false } }, { expiryDate: { $gte: now } }] }
            ]
        };

        const notices = await Notice.find(query).sort({ isPinned: -1, createdAt: -1 });
        res.status(200).json({ notices });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * TEACHER - MESSAGING
 */
export const getTeacherChatHistory = async (req: any, res: Response) => {
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

export const getTeacherConversations = async (req: any, res: Response) => {
    try {
        const messages = await Message.find({
            $or: [{ sender: req.user.id }, { receiver: req.user.id }]
        }).sort({ createdAt: -1 });

        const partnerIds = new Set();
        messages.forEach(m => {
            if (!m.group) {
                const partnerId = m.sender.toString() === req.user.id ? m.receiver?.toString() : m.sender.toString();
                if (partnerId) partnerIds.add(partnerId);
            }
        });

        const partners = await User.find({ _id: { $in: Array.from(partnerIds) } } as any).select('name role profilePicture');
        res.status(200).json({ partners });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const sendTeacherMessage = async (req: any, res: Response) => {
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
        console.error(chalk.red('[Teacher Controller] sendTeacherMessage error:'), error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
