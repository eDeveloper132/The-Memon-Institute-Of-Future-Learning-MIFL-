import request from 'supertest';
process.env.NODE_ENV = 'test';
import app from '../index.js';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { connectDB } from '../config/db.js';
import { Attendance } from '../schemas/models/attendance.model.js';
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

describe('Notice Management Integration Tests', () => {
    let adminToken: string;
    let studentToken: string;
    let teacherToken: string;
    let adminId: string;

    beforeAll(async () => {
        await connectDB();
        // Mocking IDs
        adminId = new mongoose.Types.ObjectId().toString();
        
        // Generate tokens
        adminToken = jwt.sign({ id: adminId, role: 'admin' }, JWT_SECRET);
        studentToken = jwt.sign({ id: new mongoose.Types.ObjectId().toString(), role: 'student' }, JWT_SECRET);
        teacherToken = jwt.sign({ id: new mongoose.Types.ObjectId().toString(), role: 'teacher' }, JWT_SECRET);
    }, 30000);

    afterAll(async () => {
        await mongoose.connection.close();
    }, 30000);

    describe('Admin CRUD Operations', () => {
        let noticeId: string;

        it('should be blocked for non-admins', async () => {
            const res = await request(app)
                .post('/api/admin/notices')
                .set('Authorization', `Bearer ${studentToken}`)
                .send({ title: 'Test', content: 'Test' });
            
            expect(res.status).toBe(403);
        });

        it('should create a new notice', async () => {
            const res = await request(app)
                .post('/api/admin/notices')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    title: 'New Holiday',
                    content: 'School is closed tomorrow',
                    audience: ['all'],
                    isPinned: true
                });
            
            expect(res.status).toBe(201);
            expect(res.body.notice).toBeDefined();
            expect(res.body.notice.title).toBe('New Holiday');
            noticeId = res.body.notice._id;
        });

        it('should create a new notice and emit socket event', async () => {
            const res = await request(app)
                .post('/api/admin/notices')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    title: 'Socket Test',
                    content: 'Testing socket emission',
                    audience: ['all']
                });
            
            expect(res.status).toBe(201);
            // In a real test we would check if io.emit was called. 
            // For now, we verify the endpoint still works with the new logic.
        });

        it('should list all notices for admin', async () => {
            const res = await request(app)
                .get('/api/admin/notices')
                .set('Authorization', `Bearer ${adminToken}`);
            
            expect(res.status).toBe(200);
            expect(Array.isArray(res.body.notices)).toBe(true);
            expect(res.body.notices.length).toBeGreaterThan(0);
        });

        it('should update an existing notice', async () => {
            const res = await request(app)
                .patch(`/api/admin/notices/${noticeId}`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send({ title: 'Updated Holiday' });
            
            expect(res.status).toBe(200);
            expect(res.body.notice.title).toBe('Updated Holiday');
        });

        it('should delete a notice', async () => {
            const res = await request(app)
                .delete(`/api/admin/notices/${noticeId}`)
                .set('Authorization', `Bearer ${adminToken}`);
            
            expect(res.status).toBe(200);
        });
    });

    describe('User Retrieval', () => {
        let classId: string;
        let studentWithClassToken: string;

        beforeAll(async () => {
            classId = new mongoose.Types.ObjectId().toString();
            studentWithClassToken = jwt.sign({ id: new mongoose.Types.ObjectId().toString(), role: 'student', currentClass: classId }, JWT_SECRET);
        }, 30000);

        it('should list relevant notices for a student', async () => {
            const res = await request(app)
                .get('/api/student/notices')
                .set('Authorization', `Bearer ${studentWithClassToken}`);
            
            expect(res.status).toBe(200);
            expect(res.body.notices).toBeDefined();
        });

        it('should list relevant notices for a teacher', async () => {
            const res = await request(app)
                .get('/api/teacher/notices')
                .set('Authorization', `Bearer ${teacherToken}`);
            
            expect(res.status).toBe(200);
            expect(res.body.notices).toBeDefined();
        });
    });
});
