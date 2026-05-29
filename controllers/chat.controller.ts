import type { Request, Response } from 'express';
import { ChatGroup } from '../schemas/models/chatGroup.model.js';
import { Message } from '../schemas/models/message.model.js';
import { User } from '../schemas/models/user.model.js';
import { Class } from '../schemas/models/class.model.js';
import chalk from 'chalk';

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

export const sendMessage = async (req: any, res: Response) => {
    try {
        const userId = req.user.id;
        const role = req.user.role;
        const { receiver, groupId, content } = req.body;

        if (!content) return res.status(400).json({ message: 'Content is required' });

        const messageData: any = {
            sender: userId,
            content
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
