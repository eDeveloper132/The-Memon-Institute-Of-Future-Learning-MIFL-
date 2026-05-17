import type { Request, Response } from 'express';
import { User } from '../schemas/models/user.model.js';
import { Class } from '../schemas/models/class.model.js';
import { Attendance } from '../schemas/models/attendance.model.js';
import { Course } from '../schemas/models/course.model.js';
import { Exam, Grade } from '../schemas/models/exam.model.js';
import { Assignment, Submission } from '../schemas/models/assignment.model.js';
import { Quiz } from '../schemas/models/quiz.model.js';
import { Material } from '../schemas/models/material.model.js';
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
export const getAttendanceData = async (req: any, res: Response) => {
    try {
        const { classId, date } = req.query;
        if (!classId) return res.status(400).json({ message: 'Class ID is required' });

        const selectedClass = await Class.findById(classId).populate('students', 'name email');
        if (!selectedClass) return res.status(404).json({ message: 'Class not found' });

        const queryDate = date ? new Date(date as string) : new Date();
        queryDate.setHours(0, 0, 0, 0);

        const records = await Attendance.find({
            class: classId,
            date: {
                $gte: queryDate,
                $lt: new Date(queryDate.getTime() + 24 * 60 * 60 * 1000)
            }
        });

        res.status(200).json({
            students: selectedClass.students,
            records
        });
    } catch (error: any) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const markAttendance = async (req: any, res: Response) => {
    try {
        const { classId, attendanceData, date } = req.body; // attendanceData: [{studentId, status}]
        const recordedBy = req.user.id;

        const dateObj = date ? new Date(date) : new Date();
        dateObj.setHours(0, 0, 0, 0);

        const operations = attendanceData.map((item: any) => ({
            updateOne: {
                filter: { student: item.studentId, class: classId, date: dateObj },
                update: { status: item.status, recordedBy },
                upsert: true
            }
        }));

        await Attendance.bulkWrite(operations);
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
        const assignment = await Assignment.create({
            ...req.body,
            teacher: req.user.id
        });
        res.status(201).json({ message: 'Assignment created successfully', assignment });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getAssignments = async (req: any, res: Response) => {
    try {
        const assignments = await Assignment.find({ teacher: req.user.id })
            .populate('course', 'title')
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
 * Result Management
 */
export const getExamsAndGrades = async (req: any, res: Response) => {
    try {
        const teacherId = req.user.id;
        const courses = await Course.find({ teacher: teacherId });
        const courseIds = courses.map(c => c._id);

        const exams = await Exam.find({ course: { $in: courseIds } });
        res.status(200).json({ exams });
    } catch (error: any) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
