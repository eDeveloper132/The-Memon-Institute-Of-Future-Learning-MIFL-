import type { Request, Response } from 'express';
import { User } from '../schemas/models/user.model.js';
import { Attendance } from '../schemas/models/attendance.model.js';
import { Fee } from '../schemas/models/fee.model.js';
import { Course } from '../schemas/models/course.model.js';
import { Grade } from '../schemas/models/exam.model.js';
import { Class } from '../schemas/models/class.model.js';
import { Assignment, Submission } from '../schemas/models/assignment.model.js';
import { Material } from '../schemas/models/material.model.js';
import { Quiz, QuizAttempt } from '../schemas/models/quiz.model.js';
import { Message } from '../schemas/models/message.model.js';
import { Notice } from '../schemas/models/notice.model.js';
import chalk from 'chalk';

/**
 * STUDENT - PROFILE MANAGEMENT
 */
export const getMyProfile = async (req: any, res: Response) => {
    try {
        const user = await User.findById(req.user.id).populate('currentClass', 'name');
        if (!user) return res.status(404).json({ message: 'Student not found' });
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateMyDetails = async (req: any, res: Response) => {
    try {
        const { phoneNumber, address } = req.body;
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { phoneNumber, address },
            { new: true }
        );
        res.status(200).json({ message: 'Details updated', user });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * STUDENT - ACADEMIC LOGIC
 */
export const enrollCourse = async (req: any, res: Response) => {
    try {
        const { courseId } = req.params;
        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ message: 'Course not found' });

        if (course.enrolledStudents.includes(req.user.id)) {
            return res.status(400).json({ message: 'Already enrolled' });
        }

        course.enrolledStudents.push(req.user.id);
        await course.save();
        res.status(200).json({ message: 'Enrolled successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getMyAttendance = async (req: any, res: Response) => {
    try {
        const records = await Attendance.find({ student: req.user.id }).populate('course', 'title');
        res.status(200).json({ records });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getMyResults = async (req: any, res: Response) => {
    try {
        const results = await Grade.find({ student: req.user.id }).populate({
            path: 'exam',
            populate: { path: 'course', select: 'title' }
        });
        res.status(200).json({ results });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * STUDENT - FINANCIAL LOGIC
 */
export const getMyFees = async (req: any, res: Response) => {
    try {
        const vouchers = await Fee.find({ student: req.user.id }).sort({ dueDate: -1 });
        res.status(200).json({ vouchers });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * STUDENT - ASSIGNMENTS & MATERIALS
 */
export const getMyAssignments = async (req: any, res: Response) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user || !user.currentClass) return res.status(200).json({ assignments: [], submissions: [] });

        const assignments = await Assignment.find({ class: user.currentClass })
            .populate('course', 'title')
            .populate('teacher', 'name');
            
        // Fetch student submissions for these assignments
        const submissions = await Submission.find({ student: req.user.id });

        res.status(200).json({ assignments, submissions });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const submitAssignment = async (req: any, res: Response) => {
    try {
        const { assignmentId } = req.params;
        
        // Use findOneAndUpdate to overwrite existing submission or create a new one
        const submission = await Submission.findOneAndUpdate(
            { assignment: assignmentId, student: req.user.id },
            { 
                ...req.body, 
                submittedAt: new Date(),
                // Reset status to pending if it was graded (optional, but usually good)
                status: 'pending' 
            },
            { upsert: true, new: true }
        );

        // Notify the teacher
        const assignment = await Assignment.findById(assignmentId);
        if (assignment) {
            req.io.to(String(assignment.teacher)).emit('notification', {
                type: 'ASSIGNMENT_SUBMISSION',
                message: `A student has updated/submitted an assignment: ${assignment.title}`,
                submissionId: submission._id
            });
        }

        res.status(201).json({ message: 'Assignment submitted', submission });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getMyMaterials = async (req: any, res: Response) => {
    try {
        // Find courses where student is enrolled
        const courses = await Course.find({ enrolledStudents: req.user.id });
        const courseIds = courses.map(c => c._id);

        // Fetch materials ONLY for those courses
        const materials = await Material.find({ course: { $in: courseIds } })
            .populate('course', 'title')
            .populate('teacher', 'name');
            
        res.status(200).json({ materials });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * STUDENT - QUIZZES
 */
export const getAvailableQuizzes = async (req: any, res: Response) => {
    try {
        const courses = await Course.find({ enrolledStudents: req.user.id });
        const courseIds = courses.map(c => c._id);

        const quizzes = await Quiz.find({ course: { $in: courseIds }, isActive: true })
            .populate('course', 'title');
            
        const attempts = await QuizAttempt.find({ student: req.user.id });
        res.status(200).json({ quizzes, attempts });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const attemptQuiz = async (req: any, res: Response) => {
    try {
        const { quizId } = req.params;
        const { answers } = req.body; // Expecting [{ questionIndex: Number, selectedOption: Number }]

        const quiz = await Quiz.findById(quizId);
        if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
        if (!quiz.isActive) return res.status(400).json({ message: 'Quiz is no longer active' });

        // Check if student already attempted this quiz
        const existingAttempt = await QuizAttempt.findOne({ quiz: quizId, student: req.user.id });
        if (existingAttempt) {
            return res.status(400).json({ message: 'Quiz already attempted' });
        }

        // Calculate score
        let score = 0;
        if (answers && Array.isArray(answers)) {
            answers.forEach((ans: any) => {
                const question = quiz.questions[ans.questionIndex];
                if (question && question.correctAnswer === ans.selectedOption) {
                    score += (question.points || 1);
                }
            });
        }

        const attempt = await QuizAttempt.create({
            quiz: quizId,
            student: req.user.id,
            answers: answers || [],
            score
        });

        res.status(201).json({ message: 'Quiz attempt recorded', attempt });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * STUDENT - NOTICES
 */
export const getMyNotices = async (req: any, res: Response) => {
    try {
        const studentClass = req.user.currentClass;
        const now = new Date();

        const query: any = {
            $and: [
                {
                    $or: [
                        { audience: 'all' },
                        { audience: 'students' },
                        ...(studentClass ? [{ targetClass: studentClass }] : [])
                    ]
                },
                {
                    $or: [
                        { expiryDate: { $exists: false } },
                        { expiryDate: { $gte: now } }
                    ]
                }
            ]
        };

        const notices = await Notice.find(query).sort({ isPinned: -1, createdAt: -1 });
        res.status(200).json({ notices });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * STUDENT - MESSAGING
 */
export const getStudentChatHistory = async (req: any, res: Response) => {
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

export const getStudentConversations = async (req: any, res: Response) => {
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

export const sendStudentMessage = async (req: any, res: Response) => {
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
        console.error(chalk.red('[Student Controller] sendStudentMessage error:'), error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
