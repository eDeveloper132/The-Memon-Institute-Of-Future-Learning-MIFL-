import type { Request, Response } from 'express';
import { ChatGroup } from '../schemas/models/chatGroup.model.js';
import { Message } from '../schemas/models/message.model.js';
import { User } from '../schemas/models/user.model.js';
import { Class } from '../schemas/models/class.model.js';
import chalk from 'chalk';
import { createClient } from '@sanity/client';

// Initialize Sanity Client
const sanityClient = createClient({
    projectId: process.env.SANITY_PROJECT_ID as string,
    dataset: process.env.SANITY_DATASET as string,
    token: process.env.SANITY_API_TOKEN as string,
    useCdn: false,
    apiVersion: '2023-05-03',
});

export const createGroup = async (req: any, res: Response) => {
    try {
        const { name, description, members, classId, batchName } = req.body;
        const userId = req.user.id;
        const role = req.user.role;

        if (role !== 'admin' && role !== 'teacher') {
            return res.status(403).json({ message: 'Not authorized to create groups' });
        }

        // Add creator to members if not present
        const uniqueMembers = Array.from(new Set([...members, userId]));

        const groupData: any = {
            name,
            description,
            creator: userId,
            members: uniqueMembers
        };
        
        if (classId && batchName) {
            groupData.classBatch = { classId, batchName };
        }

        const newGroup = await ChatGroup.create(groupData);

        res.status(201).json({ group: newGroup });
    } catch (error) {
        console.error(chalk.red('[Chat] createGroup error:'), error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getUserGroups = async (req: any, res: Response) => {
    try {
        const userId = req.user.id;
        const role = req.user.role;
        let groups;
        
        if (role === 'admin') {
             groups = await ChatGroup.find({ isArchived: false })
            .select('-__v')
            .sort({ updatedAt: -1 });
        } else {
             groups = await ChatGroup.find({ members: userId, isArchived: false })
            .select('-__v')
            .sort({ updatedAt: -1 });
        }

        res.status(200).json({ groups });
    } catch (error) {
        console.error(chalk.red('[Chat] getUserGroups error:'), error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getAllowedContacts = async (req: any, res: Response) => {
    try {
        const userId = req.user.id;
        const role = req.user.role;
        let allowedIds = new Set<string>();

        const admins = await User.find({ role: 'admin' }).select('_id');
        admins.forEach(a => allowedIds.add(a._id.toString()));

        if (role === 'admin') {
            // Admin can see everyone
            const allUsers = await User.find().select('_id name role profilePicture');
            const filteredAll = allUsers.filter(c => c._id.toString() !== userId);
            return res.status(200).json({ contacts: filteredAll });
        }

        if (role === 'teacher') {
            const teachers = await User.find({ role: 'teacher' }).select('_id');
            teachers.forEach(t => allowedIds.add(t._id.toString()));

            const classes = await Class.find({ classTeacher: userId }).populate('students').populate('batches.students');
            
            for (const cls of classes) {
                // Add students
                cls.students.forEach((s: any) => allowedIds.add(s._id?.toString() || s.toString()));
                // Add parents
                for (const studentId of cls.students) {
                    const student = await User.findById(studentId);
                    if (student && student.parent) {
                        allowedIds.add(student.parent.toString());
                    }
                }
            }
        } else if (role === 'student') {
            const teachers = await User.find({ role: 'teacher' }).select('_id');
            teachers.forEach(t => allowedIds.add(t._id.toString()));

            const student = await User.findById(userId);
            if (student && student.currentClass) {
                const cls = await Class.findById(student.currentClass);
                if (cls) {
                    cls.students.forEach((s: any) => allowedIds.add(s.toString()));
                }
            }
        } else if (role === 'parent') {
            const children = await User.find({ parent: userId });
            
            for (const child of children) {
                if (child.currentClass) {
                    const cls = await Class.findById(child.currentClass);
                    if (cls && cls.classTeacher) {
                        allowedIds.add(cls.classTeacher.toString());
                    }
                }
            }
        }

        // Convert allowedIds set to an array and fetch user details
        const contactIds = Array.from(allowedIds);
        const contacts = await User.find({ _id: { $in: contactIds } })
            .select('_id name role profilePicture');

        // Remove self
        const filteredContacts = contacts.filter(c => c._id.toString() !== userId);

        res.status(200).json({ contacts: filteredContacts });
    } catch (error) {
        console.error(chalk.red('[Chat] getAllowedContacts error:'), error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getChatHistory = async (req: any, res: Response) => {
    try {
        const userId = req.user.id;
        const role = req.user.role;
        const { partnerId, groupId } = req.query;

        let messages = [];

        if (groupId) {
            // Verify membership
            const group = await ChatGroup.findById(groupId);
            if (!group || (!group.members.includes(userId) && role !== 'admin')) {
                return res.status(403).json({ message: 'Access denied' });
            }
            messages = await Message.find({ group: groupId })
                .populate('sender', 'name profilePicture role')
                .sort({ createdAt: 1 });
        } else if (partnerId) {
            messages = await Message.find({
                $or: [
                    { sender: userId, receiver: partnerId },
                    { sender: partnerId, receiver: userId }
                ]
            })
            .populate('sender', 'name profilePicture role')
            .sort({ createdAt: 1 });
        } else {
            return res.status(400).json({ message: 'Must provide partnerId or groupId' });
        }

        res.status(200).json({ messages });
    } catch (error) {
        console.error(chalk.red('[Chat] getChatHistory error:'), error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getUnreadCounts = async (req: any, res: Response) => {
    try {
        const userId = req.user.id;

        // 1. Direct Messages Unread Count
        const unreadDMs = await Message.aggregate([
            { $match: { receiver: userId, isRead: false, group: { $exists: false } } },
            { $group: { _id: '$sender', count: { $sum: 1 } } }
        ]);

        const dmUnread: Record<string, number> = {};
        unreadDMs.forEach(dm => {
            dmUnread[dm._id.toString()] = dm.count;
        });

        // 2. Group Messages Unread Count
        // Find all groups the user is a member of
        const userGroups = await ChatGroup.find({ members: userId }).select('_id');
        const groupIds = userGroups.map(g => g._id);

        const unreadGroups = await Message.aggregate([
            { $match: { group: { $in: groupIds }, readBy: { $ne: userId } } },
            { $group: { _id: '$group', count: { $sum: 1 } } }
        ]);

        const groupUnread: Record<string, number> = {};
        unreadGroups.forEach(g => {
            groupUnread[g._id.toString()] = g.count;
        });

        res.status(200).json({ dmUnread, groupUnread });
    } catch (error) {
        console.error(chalk.red('[Chat] getUnreadCounts error:'), error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const syncData = async (req: any, res: Response) => {
    try {
        const userId = req.user.id;
        const { since } = req.query;
        
        const lastSync = since ? new Date(since) : new Date(Date.now() - 60 * 60 * 1000); // Default to last hour
        const now = new Date();

        // 1. New Messages (DMs for user or Groups user is in)
        const userGroups = await ChatGroup.find({ members: userId, isArchived: false }).select('_id');
        const groupIds = userGroups.map(g => g._id);

        const newMessages = await Message.find({
            $or: [
                { receiver: userId, createdAt: { $gt: lastSync } },
                { group: { $in: groupIds }, createdAt: { $gt: lastSync } }
            ],
            sender: { $ne: userId } // Don't sync own messages back
        })
        .populate('sender', 'name profilePicture role')
        .sort({ createdAt: 1 })
        .limit(50);

        // 2. New Notices (Audience based)
        const role = req.user.role;
        const audienceFilter = ['all'];
        if (role === 'teacher') audienceFilter.push('teachers');
        if (role === 'student') audienceFilter.push('students');
        if (role === 'parent') audienceFilter.push('parents');

        // Note: Notice model needs to be imported if we want to sync them here. 
        // For now, let's focus on messages to restore teacher chat on Vercel.

        res.status(200).json({
            newMessages,
            timestamp: now.toISOString()
        });
    } catch (error) {
        console.error(chalk.red('[Chat] syncData error:'), error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const uploadAttachment = async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        
        // Determine Sanity asset type (image or file)
        const assetType = req.file.mimetype.startsWith('image/') ? 'image' : 'file';

        // Upload to Sanity Assets
        const asset = await sanityClient.assets.upload(assetType, req.file.buffer, {
            filename: req.file.originalname,
            contentType: req.file.mimetype,
        });

        // Return the Sanity asset URL
        res.status(201).json({ url: asset.url });
    } catch (error) {
        console.error(chalk.red('[Chat] uploadAttachment error:'), error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateGroup = async (req: any, res: Response) => {
    try {
        const { id } = req.params;
        const { name, description, members } = req.body;
        const userId = req.user.id;
        const role = req.user.role;

        const group = await ChatGroup.findById(id);
        if (!group) return res.status(404).json({ message: 'Group not found' });

        // Authorization: Only creator or admin
        if (group.creator.toString() !== userId && role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to edit this group' });
        }

        if (name) group.name = name;
        if (description !== undefined) group.description = description;
        if (members) {
            // Ensure creator is always a member
            const uniqueMembers = Array.from(new Set([...members, group.creator.toString()]));
            group.members = uniqueMembers as any;
        }

        await group.save();
        res.status(200).json({ group });
    } catch (error) {
        console.error(chalk.red('[Chat] updateGroup error:'), error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteMessage = async (req: any, res: Response) => {
    try {
        const { id } = req.params;
        const role = req.user.role;

        if (role !== 'admin') {
            return res.status(403).json({ message: 'Only admins can delete messages' });
        }

        const message = await Message.findByIdAndDelete(id);
        if (!message) return res.status(404).json({ message: 'Message not found' });

        res.status(200).json({ message: 'Message deleted successfully' });
    } catch (error) {
        console.error(chalk.red('[Chat] deleteMessage error:'), error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const sendMessage = async (req: any, res: Response) => {
    try {
        const userId = req.user.id;
        const role = req.user.role;
        const { receiver, groupId, content, attachments } = req.body;

        if (!content) return res.status(400).json({ message: 'Content is required' });

        const messageData: any = {
            sender: userId,
            content,
            attachments: attachments || []
        };

        if (groupId) {
            const group = await ChatGroup.findById(groupId);
            if (!group || (!group.members.includes(userId) && role !== 'admin')) {
                return res.status(403).json({ message: 'Access denied' });
            }
            messageData.group = groupId;
        } else if (receiver) {
            messageData.receiver = receiver;
        } else {
            return res.status(400).json({ message: 'Must provide receiver or groupId' });
        }

        const newMessageRaw = await Message.create(messageData);
        const newMessage = await Message.findById(newMessageRaw._id).populate('sender', 'name profilePicture role');

        // Fallback for REST emit if needed
        if (req.io) {
            if (groupId) {
                req.io.to(`group:${groupId}`).emit('receiveMessage', newMessage);
            } else if (receiver) {
                req.io.to(receiver).emit('receiveMessage', newMessage);
                req.io.to(userId).emit('messageSent', newMessage);
            }
        }

        res.status(201).json({ message: newMessage });
    } catch (error) {
        console.error(chalk.red('[Chat] sendMessage error:'), error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
