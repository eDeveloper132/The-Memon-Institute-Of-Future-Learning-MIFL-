import "dotenv/config";

import express, { type Request, type Response } from "express";
import { createServer } from "http";
import cors from "cors";
import chalk from "chalk";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import path from "path";

import { securityMiddleware } from "./middlewares/security.js";
import { generalLimiter } from "./middlewares/rateLimiter.js";
import authRoutes from "./routes/auth.routes.js";
import teacherRoutes from "./routes/teacher.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import studentRoutes from "./routes/student.routes.js";
import parentRoutes from "./routes/parent.routes.js";
import { authenticate } from "./middlewares/auth.js";

const app = express();

// Trust the first proxy (Vercel)
app.set('trust proxy', 1);

const httpServer = createServer(app);
const PORT = parseInt(process.env.PORT || "2500", 10);

// Diagnostic Route
app.get("/api/health", (req, res) => {
    res.status(200).json({ 
        status: "ok", 
        hasMongo: !!process.env.MONGODB_URI,
        hasJwt: !!process.env.JWT_SECRET
    });
});

// Global Middlewares
app.use(securityMiddleware);
app.use(generalLimiter);
app.use(cors());
app.use(express.json());
app.use(cookieParser());
    app.use(async (req, res, next) => {
         try {
             await connectDB();
             next();
         } catch (err) {
             console.error(chalk.red("Database connection middleware error:"), err);
             res.status(500).json({ message: "Database connection failed" });
         }
     });
// API Routes
app.use("/api/auth", authRoutes);
app.use(express.static(path.join(process.cwd(), "public")));



// Protected View Routes
app.get("/", authenticate, (req: Request, res: Response) => {
    res.sendFile(path.join(process.cwd(), "public", "protected", "index.html"));
});
app.use("/api/teacher", teacherRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/parent", parentRoutes);
process.on("uncaughtException", (err) => {
    console.error(chalk.red("Uncaught Exception:"), err);
    // process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
    console.error(chalk.red("Unhandled Rejection at:"), promise, "reason:", reason);
    // process.exit(1);
});

if (process.env.NODE_ENV !== "production") {
    httpServer.listen(PORT, () => {
        console.log(chalk.blue("Server is running on http://localhost:" + PORT));
    });
}

export default app;
