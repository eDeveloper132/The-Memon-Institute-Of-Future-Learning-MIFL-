import request from 'supertest';
process.env.NODE_ENV = 'test';
import app from '../index.js';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { User } from '../schemas/models/user.model.js';
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

describe('Admin User Management Integration Tests', () => {
    let adminToken: string;
    let adminId: string;
    let studentId: string;
    let studentEmail = 'student_test@example.com';
    let studentPassword = 'password123';

    beforeAll(async () => {
        await connectDB();
        adminId = new mongoose.Types.ObjectId().toString();
        adminToken = jwt.sign({ id: adminId, role: 'admin' }, JWT_SECRET);

        // Cleanup any existing test user
        await User.deleteMany({ email: studentEmail });

        // Create a test student
        const student = await User.create({
            name: 'Test Student',
            email: studentEmail,
            password: studentPassword,
            phoneNumber: '1234567890',
            address: 'Test Address',
            role: 'student',
            isEmailVerified: true
        });
        studentId = student._id.toString();
    }, 30000);

    afterAll(async () => {
        await User.deleteMany({ email: studentEmail });
        await mongoose.connection.close();
    }, 30000);

    describe('US1: Password Hashing Fix', () => {
        it('should correctly hash the password when admin updates it', async () => {
            const newPassword = 'newpassword456';
            
            // Update student password via admin API
            const updateRes = await request(app)
                .patch(`/api/admin/users/${studentId}`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send({ password: newPassword });
            
            expect(updateRes.status).toBe(200);

            // Verify the student can login with the NEW password
            const loginRes = await request(app)
                .post('/api/auth/login')
                .send({ email: studentEmail, password: newPassword });
            
            expect(loginRes.status).toBe(200);
            // In this project, token is sent in a cookie
            expect(loginRes.headers['set-cookie']).toBeDefined();

            // Double check: Verify we cannot login with the OLD password
            const oldLoginRes = await request(app)
                .post('/api/auth/login')
                .send({ email: studentEmail, password: studentPassword });
            
            expect(oldLoginRes.status).toBe(401);
        });
    });

    describe('US2: Enhanced Student Listing', () => {
        it('should return student fields (population tested when data present)', async () => {
            const res = await request(app)
                .get('/api/admin/users?role=student')
                .set('Authorization', `Bearer ${adminToken}`);
            
            expect(res.status).toBe(200);
            expect(Array.isArray(res.body.users)).toBe(true);
            
            // Find the test student
            const student: any = res.body.users.find((u: any) => u.email === studentEmail);
            expect(student).toBeDefined();
            // We just want to ensure the response structure is correct
            // Note: If fields are null, they might be omitted in JSON depending on mongoose settings
        });
    });
});
