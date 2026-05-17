import type { Request, Response } from 'express';
import { User } from '../schemas/models/user.model.js';
import { Class } from '../schemas/models/class.model.js';
import { Attendance } from '../schemas/models/attendance.model.js';
import { Course } from '../schemas/models/course.model.js';
import { Exam, Grade } from '../schemas/models/exam.model.js';
// import { Assignment, Submission } from '../schemas/models/assignment.model.js'; // Will use if file exists
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

        // Get pending grading (example: using Exam model for now)
        const pendingGrading = await Exam.countDocuments({ 
            // Logic to find exams/assignments that need grading
        });

        res.status(200).json({
            classesCount,
            totalStudents,
            pendingGrading,
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
export const getAssignments = async (req: any, res: Response) => {
    try {
        // Placeholder for Assignment model logic
        res.status(200).json({ assignments: [] });
    } catch (error: any) {
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
