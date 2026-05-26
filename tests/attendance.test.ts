import request from 'supertest';
process.env.NODE_ENV = 'test';
import app from '../index.js';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { User } from '../schemas/models/user.model.js';
import { Attendance } from '../schemas/models/attendance.model.js';
import { connectDB } from '../config/db.js';
import { jest, describe, it, beforeAll, afterAll, expect } from '@jest/globals';

// Mock MailService
jest.unstable_mockModule('../services/mail.service.js', () => ({
    mailService: {
        sendMail: jest.fn(),
        sendWelcomeEmail: jest.fn(),
        verifyConnection: jest.fn()
    }
}));

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

describe('Admin Teacher Attendance Integration Tests', () => {
    let adminToken: string;
    let teacherId: string;
    let adminId: string;

    beforeAll(async () => {
        await connectDB();
        adminId = new mongoose.Types.ObjectId().toString();
        adminToken = jwt.sign({ id: adminId, role: 'admin' }, JWT_SECRET);

        const teacher = await User.create({
            name: 'Attendance Teacher',
            email: 'att_teacher@example.com',
            password: 'password123',
            phoneNumber: '1112223333',
            address: 'Faculty Block',
            role: 'teacher',
            isEmailVerified: true
        });
        teacherId = teacher._id.toString();
    }, 30000);

    afterAll(async () => {
        await User.deleteMany({ email: 'att_teacher@example.com' });
        await Attendance.deleteMany({ student: teacherId });
        await mongoose.connection.close();
    }, 30000);

    describe('US1: Viewing Attendance with Precise Timestamps', () => {
        it('should retrieve attendance records with checkIn and checkOut times', async () => {
            const dateStr = '2026-05-26';
            const testDate = new Date(dateStr);
            testDate.setHours(0,0,0,0);
            
            const checkIn = new Date(`${dateStr}T09:00:00Z`);
            const checkOut = new Date(`${dateStr}T17:00:00Z`);

            await Attendance.create({
                student: teacherId,
                date: testDate,
                checkIn,
                checkOut,
                status: 'present',
                recordedBy: adminId
            });

            const res = await request(app)
                .get(`/api/admin/attendance?role=teacher&date=${dateStr}`)
                .set('Authorization', `Bearer ${adminToken}`);
            
            expect(res.status).toBe(200);
            expect(Array.isArray(res.body.records)).toBe(true);
            
            const record = res.body.records.find((r: any) => 
                (r.student?._id || r.student) === teacherId
            );
            
            expect(record).toBeDefined();
            expect(new Date(record.checkIn).toISOString()).toBe(checkIn.toISOString());
            expect(new Date(record.checkOut).toISOString()).toBe(checkOut.toISOString());
        });
    });

    describe('US3: Updating Attendance Records', () => {
        it('should allow admin to update an existing attendance record', async () => {
            const today = new Date();
            today.setHours(0,0,0,0);
            
            const record = await Attendance.create({
                student: teacherId,
                date: today,
                status: 'absent',
                recordedBy: adminId
            });

            const res = await request(app)
                .patch(`/api/admin/attendance/${record._id}`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send({ status: 'present', remarks: 'Corrected' });
            
            expect(res.status).toBe(200);
            expect(res.body.record.status).toBe('present');
            expect(res.body.record.remarks).toBe('Corrected');
        });
    });

    describe('US2: Manual Attendance Recording', () => {
        it('should allow admin to record attendance with custom date and time', async () => {
            const customDate = new Date('2026-01-01T09:00:00Z');
            const res = await request(app)
                .post('/api/admin/attendance')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    userId: teacherId,
                    status: 'present',
                    checkIn: customDate.toISOString(),
                    remarks: 'Manual entry'
                });
            
            expect(res.status).toBe(201);
            
            const check = await Attendance.findOne({ student: teacherId, remarks: 'Manual entry' });
            expect(check).toBeDefined();
            expect(new Date(check!.checkIn!).toISOString()).toBe(customDate.toISOString());
        });
    });
});
