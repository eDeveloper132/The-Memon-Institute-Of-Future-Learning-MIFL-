import mongoose, { Schema } from 'mongoose';
import type { IQuiz, IQuizAttempt } from '../types/quiz.type.js';

const quizSchema = new Schema<IQuiz>(
    {
        title: { type: String, required: true, trim: true },
        description: String,
        course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
        teacher: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        duration: { type: Number, required: true },
        startTime: { type: Date, required: true },
        questions: [{
            questionText: { type: String, required: true },
            options: [{ type: String, required: true }],
            correctAnswer: { type: Number, required: true },
            points: { type: Number, default: 1 }
        }],
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

export const Quiz = mongoose.model<IQuiz>('Quiz', quizSchema);

const quizAttemptSchema = new Schema<IQuizAttempt>(
    {
        quiz: { type: Schema.Types.ObjectId, ref: 'Quiz', required: true },
        student: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        answers: [{
            questionIndex: Number,
            selectedOption: Number,
        }],
        score: { type: Number, default: 0 },
        submittedAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

quizAttemptSchema.index({ student: 1, quiz: 1 }, { unique: true });

export const QuizAttempt = mongoose.model<IQuizAttempt>('QuizAttempt', quizAttemptSchema);
