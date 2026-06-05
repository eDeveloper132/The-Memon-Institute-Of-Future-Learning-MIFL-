import { jest } from '@jest/globals';

// 1. Define Mocks FIRST
const mockSocket = {
    to: jest.fn().mockReturnThis(),
    emit: jest.fn()
};

jest.unstable_mockModule('../socket.js', () => ({
    getIO: jest.fn(() => mockSocket),
    setupSocket: jest.fn()
}));

jest.unstable_mockModule('../services/mail.service.js', () => ({
    mailService: {
        sendMail: jest.fn<any>().mockResolvedValue(undefined)
    }
}));

// 2. Dynamic Imports
const mongoose = (await import('mongoose')).default;
const { describe, it, beforeAll, afterAll, expect, beforeEach } = await import('@jest/globals');
const { NotificationService } = await import('../services/notification.service.js');
const { User } = await import('../schemas/models/user.model.js');
const { Notification } = await import('../schemas/models/notification.model.js');
const { connectDB } = await import('../config/db.js');
const { getIO } = await import('../socket.js');
const { mailService } = await import('../services/mail.service.js');

describe('NotificationService Unit Tests', () => {
    let testUserId: string;
    let testUserEmail = 'notify_test@example.com';

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
        jest.clearAllMocks();

        const user = await User.create({
            name: 'Test Notify User',
            email: testUserEmail,
            password: 'password123',
            phoneNumber: '1234567890',
            address: 'Test Address',
            role: 'student',
            notificationPrefs: {
                email: true,
                socket: true,
                inApp: true
            }
        });
        testUserId = user._id.toString();
    });

    it('should send notification via all channels when all enabled', async () => {
        const notificationData = {
            recipient: new mongoose.Types.ObjectId(testUserId) as any,
            type: 'SYSTEM' as any,
            title: 'Test Notification',
            content: 'Hello World',
            priority: 'high' as any
        };

        const result = await NotificationService.send(notificationData);

        // Check DB
        const dbNotification = await Notification.findOne({ recipient: testUserId });
        expect(dbNotification).toBeDefined();
        expect(dbNotification?.title).toBe('Test Notification');
        expect(dbNotification?.channels).toContain('db');
        expect(dbNotification?.channels).toContain('socket');
        expect(dbNotification?.channels).toContain('email');

        // Check Socket Mock
        const mockIO = getIO() as any;
        expect(mockIO.to).toHaveBeenCalledWith(testUserId);
        expect(mockIO.emit).toHaveBeenCalledWith('notification', expect.objectContaining({
            title: 'Test Notification'
        }));

        // Check Email Mock
        expect(mailService.sendMail).toHaveBeenCalledWith(expect.objectContaining({
            to: testUserEmail,
            subject: expect.stringContaining('Test Notification')
        }));
    });

    it('should NOT send via email if preference is disabled', async () => {
        await User.findByIdAndUpdate(testUserId, {
            'notificationPrefs.email': false
        });

        const notificationData = {
            recipient: new mongoose.Types.ObjectId(testUserId) as any,
            type: 'SYSTEM' as any,
            title: 'No Email Test',
            content: 'Should not email',
            priority: 'medium' as any
        };

        await NotificationService.send(notificationData);

        expect(mailService.sendMail).not.toHaveBeenCalled();
        
        const dbNotification = await Notification.findOne({ title: 'No Email Test' });
        expect(dbNotification?.channels).not.toContain('email');
        expect(dbNotification?.channels).toContain('db');
        expect(dbNotification?.channels).toContain('socket');
    });

    it('should NOT save to DB if inApp preference is disabled', async () => {
        await User.findByIdAndUpdate(testUserId, {
            'notificationPrefs.inApp': false
        });

        const notificationData = {
            recipient: new mongoose.Types.ObjectId(testUserId) as any,
            type: 'SYSTEM' as any,
            title: 'No DB Test',
            content: 'Should not save',
            priority: 'low' as any
        };

        await NotificationService.send(notificationData);

        const dbNotification = await Notification.findOne({ title: 'No DB Test' });
        expect(dbNotification).toBeNull();
    });
});
