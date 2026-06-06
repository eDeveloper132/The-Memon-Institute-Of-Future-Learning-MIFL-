import type { Request, Response } from 'express';
import { Course } from '../schemas/models/course.model.js';
import { Department } from '../schemas/models/department.model.js';
import chalk from 'chalk';

/**
 * Get all public information for the Information Center
 */
export const getInformationCenterData = async (req: Request, res: Response) => {
    try {
        const [courses, departments] = await Promise.all([
            Course.find()
                .populate('teacher', 'name')
                .populate('department', 'name')
                .select('title code credits department teacher enrollmentFee monthlyFee syllabus outline'),
            Department.find().select('name description')
        ]);

        res.status(200).json({
            courses,
            departments,
            systemInfo: {
                name: 'MIFL - Memon Institute Of Future Learning',
                established: '2026',
                motto: 'Empowering the future through knowledge and skills.',
                contact: {
                    email: 'the.memon.learning.official@gmail.com',
                    phone: '+923062924538',
                    address: 'Sonara Heights khoja st nawabad lyari south karahi'
                }
            }
        });
    } catch (error) {
        console.error(chalk.red('[Public Controller] getInformationCenterData error:'), error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
