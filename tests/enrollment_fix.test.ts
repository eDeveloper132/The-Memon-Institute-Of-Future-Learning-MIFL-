
import { jest, describe, it, expect, beforeAll, afterAll, beforeEach } from '@jest/globals';
import { User } from '../schemas/models/user.model.js';
import { Course } from '../schemas/models/course.model.js';
import { Class } from '../schemas/models/class.model.js';
import { EnrollmentRequest } from '../schemas/models/enrollmentRequest.model.js';
import { Department } from '../schemas/models/department.model.js';
import { applyForEnrollment, getAvailableOpportunities } from '../controllers/enrollment.controller.js';
import mongoose from 'mongoose';

// Mock NotificationService to avoid Socket.io errors
jest.mock('../services/notification.service.js', () => ({
    NotificationService: {
        broadcast: jest.fn(() => Promise.resolve({})) as any,
        send: jest.fn(() => Promise.resolve({})) as any
    }
}));

describe('Enrollment Fix Reproduction', () => {
    let studentId: string;
    let courseId: string;
    let classId: string;

    beforeAll(async () => {
        // Assume mongoose is already connected or handled by jest setup
        // But for standalone execution safety:
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/test');
        }
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    beforeEach(async () => {
        await User.deleteMany({});
        await Course.deleteMany({});
        await Class.deleteMany({});
        await EnrollmentRequest.deleteMany({});
        await Department.deleteMany({});

        const teacher = await User.create({
            name: 'Teacher',
            email: 'teacher@test.com',
            password: 'password',
            role: 'teacher',
            phoneNumber: '111',
            address: 'Addr'
        });

        const student = await User.create({
            name: 'Student',
            email: 'student@test.com',
            password: 'password',
            role: 'student',
            phoneNumber: '222',
            address: 'Addr'
        });
        studentId = student._id.toString();

        const dept = await Department.create({
            name: 'Dept',
            code: 'DEPT',
            headOfDepartment: teacher._id
        });

        const course = await Course.create({
            title: 'Course 1',
            code: 'C1',
            department: dept._id,
            teacher: teacher._id,
            enrollmentFee: 500
        });
        courseId = course._id.toString();

        const academicClass = await Class.create({
            name: 'Class 1',
            gradeLevel: 10,
            section: 'A',
            academicYear: '2024',
            classTeacher: teacher._id,
            enrollmentFee: 1000
        });
        classId = academicClass._id.toString();
    });

    const mockRes = () => {
        const res: any = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
    };

    it('T002: should fail to show "enrolled" status for courses even when student is in enrolledStudents', async () => {
        // Directly enroll student
        await Course.findByIdAndUpdate(courseId, { $addToSet: { enrolledStudents: studentId } });

        const req = { user: { id: studentId } };
        const res = mockRes();

        await getAvailableOpportunities(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        const data = res.json.mock.calls[0][0];
        const course = data.courses.find((c: any) => c._id.toString() === courseId);
        
        // THIS IS EXPECTED TO FAIL BEFORE FIX
        expect(course.enrollmentStatus).toBe('enrolled');
    });

    it('T006: should prevent duplicate course enrollment requests (Planned)', async () => {
        const req = { user: { id: studentId }, body: { targetType: 'Course', targetId: courseId } };
        const res1 = mockRes();
        const res2 = mockRes();

        await applyForEnrollment(req, res1);
        expect(res1.status).toHaveBeenCalledWith(201);

        await applyForEnrollment(req, res2);
        
        // THIS IS EXPECTED TO FAIL BEFORE FIX (it will likely return 201 again)
        expect(res2.status).toHaveBeenCalledWith(400);
        expect(res2.json.mock.calls[0][0].message).toMatch(/already/i);
    });

    it('T007: should prevent enrollment in already enrolled courses (Planned)', async () => {
        await Course.findByIdAndUpdate(courseId, { $addToSet: { enrolledStudents: studentId } });

        const req = { user: { id: studentId }, body: { targetType: 'Course', targetId: courseId } };
        const res = mockRes();

        await applyForEnrollment(req, res);
        
        // THIS IS EXPECTED TO FAIL BEFORE FIX (it will likely return 201)
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json.mock.calls[0][0].message).toMatch(/already/i);
    });
});
