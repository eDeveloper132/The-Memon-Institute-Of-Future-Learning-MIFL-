import "dotenv/config";

import express, { type Request, type Response } from "express";
import { createServer } from "http";
import cors from "cors";
import chalk from "chalk";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.mjs";

const app = express();
const httpServer = createServer(app);
const PORT = parseInt(process.env.PORT || "2500", 10);

app.use(cors());
app.use(express.json());
app.use(cookieParser());
// Database connection with handling
connectDB().catch((err) => {
    console.error(chalk.red("Failed to connect to MongoDB:"), err.message);
});

app.get("/", (req: Request, res: Response) => {
    res.json({ 
        success: true,
        message: "Welcome to the Medic Principal Care Server!",
        data: {}
    });
});

process.on("uncaughtException", (err) => {
    console.error(chalk.red("Uncaught Exception:"), err);
    process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
    console.error(chalk.red("Unhandled Rejection at:"), promise, "reason:", reason);
    process.exit(1);
});

if (process.env.NODE_ENV !== "production") {
    httpServer.listen(PORT, () => {
        console.log(chalk.blue("Server is running on http://localhost:" + PORT));
    });
}

export default app;
