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
        if (!user || !user.currentClass) return res.status(200).json({ assignments: [] });

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
        const submission = await Submission.create({
            ...req.body,
            assignment: assignmentId,
            student: req.user.id,
            submittedAt: new Date()
        });
        res.status(201).json({ message: 'Assignment submitted', submission });
    } catch (error) {
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
        const attempt = await QuizAttempt.create({
            ...req.body,
            quiz: quizId,
            student: req.user.id
        });
        res.status(201).json({ message: 'Quiz attempt recorded', attempt });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
