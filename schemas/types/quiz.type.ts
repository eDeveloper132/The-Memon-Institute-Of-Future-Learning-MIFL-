import type { Document, Types } from 'mongoose';

export interface IQuiz extends Document {
    title: string;
    description?: string;
    course: Types.ObjectId; // Ref to Course
    teacher: Types.ObjectId; // Ref to User (Teacher)
    duration: number; // in minutes
    startTime: Date;
    questions: {
        questionText: string;
        options: string[];
        correctAnswer: number; // Index of options
        points: number;
    }[];
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface IQuizAttempt extends Document {
    quiz: Types.ObjectId; // Ref to Quiz
    student: Types.ObjectId; // Ref to User (Student)
    answers: {
        questionIndex: number;
        selectedOption: number;
    }[];
    score: number;
    submittedAt: Date;
}
