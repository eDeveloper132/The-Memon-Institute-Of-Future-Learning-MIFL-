import request from 'supertest';
import mongoose from 'mongoose';
import { describe, it, beforeAll, afterAll, expect, beforeEach } from '@jest/globals';
import app from '../index.js';
import { User } from '../schemas/models/user.model.js';
import { Notification } from '../schemas/models/notification.model.js';
import { connectDB } from '../config/db.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key_here';

describe('Notification API Integration Tests', () => {
    let testUserId: string;
    let testToken: string;
    let testUserEmail = 'api_notify_test@example.com';

    beforeAll(async () => {
        await connectDB();
    }, 30000);

    afterAll(async () => {
        await User.deleteMany({ email: testUserEmail });
        await Notification.deleteMany({});
        await mongoose.connection.close();
    }, 30000);

    beforeEach(async () => {
        await User.deleteMany({ email: testUserEmail });
        await Notification.deleteMany({});

        const user = await User.create({
            name: 'API Notify User',
            email: testUserEmail,
            password: 'password123',
            phoneNumber: '1234567890',
            address: 'Test Address',
            role: 'student'
        });
        testUserId = user._id.toString();
        testToken = jwt.sign({ id: testUserId, role: 'student' }, JWT_SECRET);

        // Create some dummy notifications
        const dummyNotifications: any[] = [
            { recipient: testUserId, type: 'SYSTEM', title: 'Unread 1', content: 'Content 1' }, // Omit readAt instead of null
            { recipient: testUserId, type: 'SYSTEM', title: 'Read 1', content: 'Content 2', readAt: new Date() }
        ];
        await Notification.create(dummyNotifications);
    });

    it('should fetch all notifications for the user', async () => {
        const res = await request(app)
            .get('/api/notifications')
            .set('Authorization', `Bearer ${testToken}`);

        expect(res.status).toBe(200);
        expect(res.body.notifications).toHaveLength(2);
    });

    it('should filter unread notifications', async () => {
        const res = await request(app)
            .get('/api/notifications?status=unread')
            .set('Authorization', `Bearer ${testToken}`);

        expect(res.status).toBe(200);
        expect(res.body.notifications).toHaveLength(1);
        expect(res.body.notifications[0].title).toBe('Unread 1');
    });

    it('should mark a notification as read', async () => {
        const unread = await Notification.findOne({ recipient: testUserId, readAt: null });
        
        const res = await request(app)
            .patch(`/api/notifications/${unread?._id}/read`)
            .set('Authorization', `Bearer ${testToken}`);

        expect(res.status).toBe(200);
        expect(res.body.notification.readAt).not.toBeNull();
    });

    it('should update preferences', async () => {
        const res = await request(app)
            .patch('/api/notifications/preferences')
            .set('Authorization', `Bearer ${testToken}`)
            .send({ email: false, socket: true, inApp: true });

        expect(res.status).toBe(200);
        expect(res.body.preferences.email).toBe(false);

        const user = await User.findById(testUserId);
        expect(user?.notificationPrefs.email).toBe(false);
    });
});
