import { Server } from 'socket.io';
import { Message } from './schemas/models/message.model.js';
import chalk from 'chalk';

export const setupSocket = (httpServer: any) => {
    const io = new Server(httpServer, {
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
            const { sender, receiver, groupId, content } = data;
            try {
                const newMessage = await Message.create({
                    sender,
                    receiver: receiver || undefined,
                    group: groupId || undefined,
                    content
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

        socket.on('disconnect', () => {
            console.log(chalk.cyan(`[Socket] User disconnected: ${socket.id}`));
        });
    });

    return io;
};
