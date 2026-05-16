     import "dotenv/config";
     import mongoose from 'mongoose';
     import chalk from 'chalk';
    
     /**
      * Global variable to cache the MongoDB connection status.
      * In Vercel's serverless environment, the process stays alive across
      * multiple invocations, so we can reuse the connection.
      */
     let isConnected: boolean = false;
    
    export const connectDB = async () => {
      // If already connected, skip
      if (isConnected && mongoose.connection.readyState === 1) {
        return;
      }
      const uri = process.env.MONGODB_URI;
      if (!uri) {
        throw new Error('MONGODB_URI is not defined in environment variables');
      }
      try {
        // Set global mongoose options for serverless
        // This prevents queries from hanging if the connection is lost
        mongoose.set('bufferCommands', false);

        const db = await mongoose.connect(uri);

        isConnected = mongoose.connection.readyState === 1;
        console.log(chalk.green('MongoDB connected successfully'));
      } catch (err) {
        console.error(chalk.red('MongoDB connection error:'), err);
        isConnected = false;
        throw err;
      }
    };