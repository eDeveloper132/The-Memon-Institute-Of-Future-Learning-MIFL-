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

        // Handle sending a message
        socket.on('sendMessage', async (data) => {
            const { sender, receiver, content } = data;
            try {
                const newMessage = await Message.create({
                    sender,
                    receiver,
                    content
                });

                // Emit to receiver's room
                io.to(receiver).emit('receiveMessage', newMessage);
                // Emit confirmation to sender
                io.to(sender).emit('messageSent', newMessage);
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
