import { Server } from 'socket.io';
import { Message } from './schemas/models/message.model.js';
import chalk from 'chalk';

let io: Server;

export const getIO = () => {
    if (!io) {
        throw new Error('Socket.io not initialized');
    }
    return io;
};

export const setupSocket = (httpServer: any) => {
    io = new Server(httpServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.log(chalk.cyan(`[Socket] User connected: ${socket.id}`));

        // User joins their own room based on their ID
        socket.on('join', (userId) => {
            socket.join(userId);
            console.log(chalk.cyan(`[Socket] User ${userId} joined their personal room`));
        });

        // Join a class-specific room for broadcasts
        socket.on('joinClass', (classId) => {
            socket.join(`class:${classId}`);
            console.log(chalk.cyan(`[Socket] User joined class room: class:${classId}`));
        });

        // Join a role-specific room (e.g., role:admin)
        socket.on('joinRole', (role) => {
            socket.join(`role:${role}`);
            console.log(chalk.cyan(`[Socket] User joined role room: role:${role}`));
        });

        // Join a group-specific room
        socket.on('joinGroup', (groupId) => {
            socket.join(`group:${groupId}`);
            console.log(chalk.cyan(`[Socket] User joined group room: group:${groupId}`));
        });

        // Handle sending a message
        socket.on('sendMessage', async (data) => {
            const { sender, receiver, groupId, content, attachments } = data;
            try {
                const newMessage = await Message.create({
                    sender,
                    receiver: receiver || undefined,
                    group: groupId || undefined,
                    content,
                    attachments: attachments || []
                });

                if (groupId) {
                    // Emit to group room
                    io.to(`group:${groupId}`).emit('receiveMessage', newMessage);
                } else if (receiver) {
                    // Emit to receiver's room and sender's room
                    io.to(receiver).emit('receiveMessage', newMessage);
                    io.to(sender).emit('messageSent', newMessage);
                }
            } catch (error) {
                console.error(chalk.red('[Socket] Error saving message:'), error);
            }
        });

        // Typing Indicators
        socket.on('typing', (data) => {
            const { receiverId, groupId, userId, userName } = data;
            const payload = { userId, userName, groupId };
            if (groupId) {
                socket.to(`group:${groupId}`).emit('userTyping', payload);
            } else if (receiverId) {
                socket.to(receiverId).emit('userTyping', payload);
            }
        });

        socket.on('stopTyping', (data) => {
            const { receiverId, groupId, userId } = data;
            const payload = { userId, groupId };
            if (groupId) {
                socket.to(`group:${groupId}`).emit('userStoppedTyping', payload);
            } else if (receiverId) {
                socket.to(receiverId).emit('userStoppedTyping', payload);
            }
        });

        // Read Receipts
        socket.on('messagesRead', async (data) => {
            const { messageIds, groupId, userId } = data;
            if (!messageIds || messageIds.length === 0) return;

            try {
                if (groupId) {
                    // Update readBy array for group messages
                    await Message.updateMany(
                        { _id: { $in: messageIds }, group: groupId, readBy: { $ne: userId } },
                        { $addToSet: { readBy: userId } }
                    );
                    io.to(`group:${groupId}`).emit('readReceipt', { messageIds, readBy: userId, groupId });
                } else {
                    // Update isRead boolean for DMs
                    await Message.updateMany(
                        { _id: { $in: messageIds }, receiver: userId, isRead: false },
                        { $set: { isRead: true } }
                    );
                    // We need to notify the original sender that their messages were read.
                    // We find the sender of the first message to know who to notify.
                    const sampleMsg = await Message.findById(messageIds[0]);
                    if (sampleMsg && sampleMsg.sender) {
                        io.to(sampleMsg.sender.toString()).emit('readReceipt', { messageIds, readBy: userId });
                    }
                }
            } catch (error) {
                console.error(chalk.red('[Socket] Error updating read receipts:'), error);
            }
        });

        socket.on('disconnect', () => {
            console.log(chalk.cyan(`[Socket] User disconnected: ${socket.id}`));
        });
    });

    return io;
};
