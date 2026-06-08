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
import { NotificationService } from '../services/notification.service.js';
import { sanityService } from '../services/sanity.service.js';
import mongoose from 'mongoose';
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
        const teacherAssignments = await Assignment.find({ teacher: teacherId }).select('_id');
        const assignmentIds = teacherAssignments.map(a => a._id);

        const [pendingAssignments, pendingExams] = await Promise.all([
            Submission.countDocuments({ 
                assignment: { $in: assignmentIds },
                status: { $in: ['submitted', 'late'] } 
            }),
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
 * Curriculum Management
 */
export const updateCourseCurriculum = async (req: any, res: Response) => {
    try {
        const { id } = req.params;
        const { outline, curriculumSections } = req.body;

        console.log(chalk.blue(`[Curriculum Debug] Updating course ${id}...`));
        console.log(chalk.gray(`[Curriculum Debug] Body: ${JSON.stringify(req.body).substring(0, 500)}...`));

        const course = await Course.findById(id);
        if (!course) return res.status(404).json({ message: 'Course not found' });

        // Authorization check
        if (String(course.teacher) !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        // Lock check
        if (course.curriculumLocked && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Curriculum is locked for modification' });
        }

        course.outline = outline;
        course.curriculumSections = curriculumSections;
        await course.save();

        res.status(200).json({ message: 'Curriculum updated successfully', course });
    } catch (error: any) {
        console.error(chalk.red('[Teacher Controller] updateCourseCurriculum error:'), error);
        res.status(500).json({ 
            message: 'Internal server error', 
            details: error.message,
            validationErrors: error.errors ? Object.keys(error.errors).map(k => error.errors[k].message) : null
        });
    }
};

export const updateClassCurriculum = async (req: any, res: Response) => {
    try {
        const { id } = req.params;
        const { classOutline, classCurriculumSections } = req.body;

        console.log(chalk.blue(`[Curriculum Debug] Updating class ${id}...`));

        const selectedClass = await Class.findById(id);
        if (!selectedClass) return res.status(404).json({ message: 'Class not found' });

        // Authorization check
        if (String(selectedClass.classTeacher) !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        // Lock check
        if (selectedClass.classCurriculumLocked && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Class curriculum is locked for modification' });
        }

        selectedClass.classOutline = classOutline;
        selectedClass.classCurriculumSections = classCurriculumSections;
        await selectedClass.save();

        res.status(200).json({ message: 'Class curriculum updated successfully', class: selectedClass });
    } catch (error: any) {
        console.error(chalk.red('[Teacher Controller] updateClassCurriculum error:'), error);
        res.status(500).json({ 
            message: 'Internal server error', 
            details: error.message,
            validationErrors: error.errors ? Object.keys(error.errors).map(k => error.errors[k].message) : null
        });
    }
};

/**
 * Attendance Logic
 */
export const getTeacherCourses = async (req: any, res: Response) => {
    try {
        const teacherId = req.user.id;
        const courses = await Course.find({ teacher: teacherId })
            .select('title batches outline curriculumSections curriculumLocked');
        res.status(200).json({ courses });
    } catch (error: any) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getTeacherClasses = async (req: any, res: Response) => {
    try {
        const teacherId = req.user.id;
        
        // 1. Find classes where they are the primary class teacher
        const classesAsHead = await Class.find({ classTeacher: teacherId })
            .select('name section gradeLevel students classOutline classCurriculumSections classCurriculumLocked');
        
        // 2. Find all students taught by this teacher in any course
        const courses = await Course.find({ teacher: teacherId }).select('enrolledStudents');
        const enrolledStudentIds = courses.reduce((acc: any[], c: any) => [...acc, ...c.enrolledStudents], []);
        
        // 3. Find the classes of those students
        const students = await User.find({ _id: { $in: enrolledStudentIds }, currentClass: { $exists: true } }).select('currentClass');
        const classIdsFromCourses = students.map(s => s.currentClass?.toString());
        
        // 4. Merge and fetch full class details
        const allRelevantClassIds = new Set([
            ...classesAsHead.map(c => c._id.toString()),
            ...classIdsFromCourses.filter(id => !!id) as string[]
        ]);
        
        const allClasses = await Class.find({ _id: { $in: Array.from(allRelevantClassIds) } })
            .select('name section gradeLevel students classOutline classCurriculumSections classCurriculumLocked');

        res.status(200).json({ classes: allClasses });
    } catch (error: any) {
        console.error(chalk.red('[Teacher Controller] getTeacherClasses error:'), error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getStudentSummary = async (req: any, res: Response) => {
    try {
        const { studentId } = req.params;
        const teacherId = req.user.id;

        // Verify teacher has access to this student
        const [teacherClasses, teacherCourses] = await Promise.all([
            Class.find({ classTeacher: teacherId }),
            Course.find({ teacher: teacherId })
        ]);

        const allowedStudentIds = new Set();
        teacherClasses.forEach(cls => cls.students.forEach(id => allowedStudentIds.add(id.toString())));
        teacherCourses.forEach(crs => crs.batches.forEach(b => b.students.forEach(id => allowedStudentIds.add(id.toString()))));

        if (!allowedStudentIds.has(studentId) && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to view this student' });
        }

        // Aggregate student data
        const [student, attendance, results, assignments, submissions] = await Promise.all([
            User.findById(studentId).select('name email phoneNumber currentClass profilePicture'),
            Attendance.find({ student: studentId }),
            Grade.find({ student: studentId }).populate({
                path: 'exam',
                populate: { path: 'course', select: 'title' }
            }),
            Assignment.find({ student: studentId }), 
            Submission.find({ student: studentId }).populate('assignment', 'title')
        ]);

        // Calculate attendance percentage
        const present = attendance.filter(r => r.status === 'present').length;
        const attendancePercentage = attendance.length ? ((present / attendance.length) * 100).toFixed(0) + '%' : '0%';

        res.status(200).json({
            student,
            attendancePercentage,
            attendanceRecords: attendance.length,
            recentGrades: results.slice(-5),
            submissions: submissions.slice(-5)
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * Material & Asset Management
 */
export const uploadMaterialAsset = async (req: any, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const asset = await sanityService.uploadAsset(req.file.buffer, req.file.originalname, req.file.mimetype);

        res.status(201).json({ 
            url: asset.url,
            filename: req.file.originalname,
            contentType: req.file.mimetype
        });
    } catch (error) {
        console.error(chalk.red('[Teacher Controller] uploadMaterialAsset error:'), error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getAttendanceStats = async (req: any, res: Response) => {
    try {
        const { classId, courseId, batchId } = req.query;
        let query: any = {};
        let studentIds: string[] = [];

        if (classId) {
            query.class = classId;
            const cls = await Class.findById(classId);
            studentIds = cls?.students.map(s => s.toString()) || [];
        } else if (courseId && batchId) {
            query.course = courseId;
            query.batch = batchId;
            const course = await Course.findById(courseId);
            const batch = course?.batches.find((b: any) => b._id.toString() === batchId);
            studentIds = batch?.students.map((s: any) => s.toString()) || [];
        }

        const allRecords = await Attendance.find(query);
        
        const studentStats = studentIds.map(sid => {
            const studentRecords = allRecords.filter(r => r.student.toString() === sid);
            const present = studentRecords.filter(r => r.status === 'present').length;
            const percentage = studentRecords.length ? (present / studentRecords.length) * 100 : 100;
            return { sid, percentage };
        });

        const avgAttendance = studentStats.length 
            ? (studentStats.reduce((acc, s) => acc + s.percentage, 0) / studentStats.length).toFixed(0) + '%'
            : '100%';
        
        const atRiskCount = studentStats.filter(s => s.percentage < 75).length;

        res.status(200).json({
            totalStudents: studentIds.length,
            avgAttendance,
            atRiskCount,
            studentPercentages: studentStats
        });
    } catch (error) {
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

        // Notify relevant room via NotificationService broadcast
        const room = classId ? `class:${classId}` : `course:${courseId}`;
        await NotificationService.broadcast({
            type: 'ACADEMIC',
            title: 'Attendance Recorded',
            content: `Attendance for ${dateObj.toLocaleDateString()} has been recorded.`,
            data: { id: classId || courseId }
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

        // Broadcast to relevant group via NotificationService
        await NotificationService.broadcast({
            type: 'ACADEMIC',
            title: 'New Assignment Posted',
            content: `A new assignment "${assignment.title}" has been posted.`,
            data: { assignmentId: assignment._id, batchId: batch || null, classId }
        });

        // Background email sending to all students in the class
        if (classId) {
            setImmediate(async () => {
                try {
                    const targetClass = await Class.findById(classId).populate('students', '_id email name');
                    const courseDoc = await Course.findById(course);
                    if (targetClass && targetClass.students.length > 0) {
                        for (const student of targetClass.students as any[]) {
                            await NotificationService.send({
                                recipient: student._id,
                                type: 'ACADEMIC',
                                title: 'New Assignment',
                                content: `A new assignment "${assignment.title}" has been posted.`,
                                data: { title: assignment.title, course: courseDoc?.title || 'Your Course', dueDate: assignment.dueDate },
                                priority: 'medium'
                            });
                        }
                    }
                } catch (err) {
                    console.error('[Teacher Controller] Background assignment notification error:', err);
                }
            });
        }

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
        await Submission.deleteMany({ assignment: id });

        res.status(200).json({ message: 'Assignment deleted successfully' });
    } catch (error) {
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

export const getSubmissionsForAssignment = async (req: any, res: Response) => {
    try {
        const { id } = req.params;
        const assignment = await Assignment.findById(id);
        if (!assignment) return res.status(404).json({ message: 'Assignment not found' });
        
        if (String(assignment.teacher) !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        const submissions = await Submission.find({ assignment: id }).populate('student', 'name email');
        res.status(200).json({ submissions });
    } catch (error) {
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

        if (!submission) return res.status(404).json({ message: 'Submission not found' });

        // Notify student via NotificationService
        await NotificationService.send({
            recipient: new mongoose.Types.ObjectId(submission.student) as any,
            type: 'ACADEMIC',
            title: 'Assignment Graded',
            content: `Your submission for an assignment has been graded. Grade: ${grade}`,
            data: { submissionId, grade },
            priority: 'medium'
        });

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
        if (!req.body.course && !req.body.class) {
            return res.status(400).json({ message: 'Material must be assigned to either a course or a class.' });
        }

        const material = await Material.create({
            ...req.body,
            teacher: req.user.id
        });

        // Background email sending
        if (req.body.class) {
            setImmediate(async () => {
                try {
                    const targetClass = await Class.findById(req.body.class).populate('students', '_id email name');
                    if (targetClass && targetClass.students.length > 0) {
                        for (const student of targetClass.students as any[]) {
                            await NotificationService.send({
                                recipient: student._id,
                                type: 'ACADEMIC',
                                title: 'New Study Material',
                                content: `New study material "${material.title}" has been uploaded for your class.`,
                                data: { title: material.title, course: material.course ? (await Course.findById(material.course))?.title : 'Your Course' },
                                priority: 'low'
                            });
                        }
                    }
                } catch (err) {
                    console.error('[Teacher Controller] Background material notification error:', err);
                }
            });
        }

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

export const updateMaterial = async (req: any, res: Response) => {
    try {
        const { id } = req.params;
        const material = await Material.findById(id);
        if (!material) return res.status(404).json({ message: 'Material not found' });
        if (String(material.teacher) !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        const updated = await Material.findByIdAndUpdate(id, { ...req.body }, { new: true });
        res.status(200).json({ message: 'Material updated successfully', material: updated });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteMaterial = async (req: any, res: Response) => {
    try {
        const { id } = req.params;
        const material = await Material.findById(id);
        if (!material) return res.status(404).json({ message: 'Material not found' });
        if (String(material.teacher) !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        await Material.findByIdAndDelete(id);
        res.status(200).json({ message: 'Material deleted successfully' });
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

        // Background email sending
        if (req.body.class) {
            setImmediate(async () => {
                try {
                    const targetClass = await Class.findById(req.body.class).populate('students', '_id email name');
                    if (targetClass && targetClass.students.length > 0) {
                        for (const student of targetClass.students as any[]) {
                            await NotificationService.send({
                                recipient: student._id,
                                type: 'ACADEMIC',
                                title: 'New Quiz Available',
                                content: `A new quiz "${quiz.title}" has been posted.`,
                                data: { title: quiz.title, course: quiz.course ? (await Course.findById(quiz.course))?.title : 'Your Course' },
                                priority: 'medium'
                            });
                        }
                    }
                } catch (err) {
                    console.error('[Teacher Controller] Background quiz notification error:', err);
                }
            });
        }

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
        const course = await Course.findOne({ _id: req.body.course, teacher: req.user.id });
        if (!course) return res.status(403).json({ message: 'Not authorized for this course' });

        const exam = await Exam.create(req.body);

        // Background email sending for Exam Schedule
        if (req.body.class) {
            setImmediate(async () => {
                try {
                    const targetClass = await Class.findById(req.body.class).populate('students', '_id email name');
                    if (targetClass && targetClass.students.length > 0) {
                        for (const student of targetClass.students as any[]) {
                            await NotificationService.send({
                                recipient: student._id,
                                type: 'ACADEMIC',
                                title: 'Exam Scheduled',
                                content: `A new exam "${exam.title}" has been scheduled for your class. Date: ${new Date(exam.date).toLocaleDateString()}`,
                                data: { title: exam.title, course: course.title, dueDate: exam.date },
                                priority: 'urgent'
                            });
                        }
                    }
                } catch (err) {
                    console.error('[Teacher Controller] Background exam notification error:', err);
                }
            });
        }

        res.status(201).json({ message: 'Exam created', exam });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const recordGrade = async (req: any, res: Response) => {
    try {
        const { examId, studentId, obtainedMarks, remarks } = req.body;
        
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

        // Notify student via NotificationService
        await NotificationService.send({
            recipient: new mongoose.Types.ObjectId(studentId) as any,
            type: 'ACADEMIC',
            title: 'Exam Graded',
            content: `A new grade has been recorded for your exam: ${exam.title}. Marks: ${obtainedMarks}`,
            data: { examId, gradeId: grade._id },
            priority: 'medium'
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
        const teacherId = req.user.id;
        
        // Find classes this teacher teaches to filter targetClass notices
        const classes = await Class.find({ classTeacher: teacherId }).select('_id');
        const classIds = classes.map(c => c._id);

        const query: any = {
             $or: [
                 { audience: { $in: ['all', 'teachers'] } },
                 { targetClass: { $in: classIds } },
                 { author: teacherId }
             ],
             $and: [
                 { $or: [{ expiryDate: { $exists: false } }, { expiryDate: { $gte: now } }, { expiryDate: null }] }
             ]
        };

        const notices = await Notice.find(query).sort({ isPinned: -1, createdAt: -1 });
        res.status(200).json({ notices });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const createNotice = async (req: any, res: Response) => {
    try {
        const { title, content, audience, targetClass, type, expiryDate, isPinned } = req.body;
        
        // Validation: Teacher can only target 'admins' or 'students'
        if (audience.includes('all') || audience.includes('parents') || audience.includes('teachers')) {
            return res.status(403).json({ message: "Teachers cannot broadcast to 'all', 'parents', or 'teachers'." });
        }

        // If targeting students, targetClass must be provided
        if (audience.includes('students') && !targetClass) {
            return res.status(400).json({ message: "targetClass is required when audience includes 'students'." });
        }

        const notice = await Notice.create({
            title,
            content,
            author: req.user.id,
            audience: audience || ['students'],
            targetClass,
            type: type || 'academic',
            expiryDate,
            isPinned: isPinned || false
        });

        // Broadcast via NotificationService
        await NotificationService.broadcast({
            type: 'NEW_NOTICE',
            title: notice.title,
            content: notice.content,
            data: { 
                noticeType: notice.type,
                id: notice._id,
                targetClass
            }
        });

        res.status(201).json({ message: 'Notice created successfully', notice });
    } catch (error) {
        console.error(chalk.red('[Teacher Controller] createNotice error:'), error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteNotice = async (req: any, res: Response) => {
    try {
        const { id } = req.params;
        const notice = await Notice.findById(id);

        if (!notice) return res.status(404).json({ message: 'Notice not found' });
        if (String(notice.author) !== req.user.id) return res.status(403).json({ message: 'Unauthorized: You can only delete your own notices' });

        await Notice.findByIdAndDelete(id);
        res.status(200).json({ message: 'Notice deleted successfully' });
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

        req.io.to(receiver).emit('receiveMessage', newMessage);
        req.io.to(sender).emit('messageSent', newMessage);

        res.status(201).json({ message: 'Message sent successfully', newMessage });
    } catch (error) {
        console.error(chalk.red('[Teacher Controller] sendTeacherMessage error:'), error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
