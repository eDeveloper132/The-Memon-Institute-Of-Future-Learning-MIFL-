 import type { Request, Response } from 'express';
 import { User } from '../schemas/models/user.model.js';
     import { Attendance } from '../schemas/models/attendance.model.js';
     import { Fee } from '../schemas/models/fee.model.js';
     import { Course } from '../schemas/models/course.model.js';
     import { Grade } from '../schemas/models/exam.model.js';
     import { Class } from '../schemas/models/class.model.js';
    
     /**
     * STUDENT - PROFILE MANAGEMENT
     */
    export const getMyProfile = async (req: any, res: Response) => {
        try {
            const user = await User.findById(req.user.id);
            if (!user) return res.status(404).json({ message: 'Student not found'
      });
            res.status(200).json({ user });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    };
   
    export const updateMyDetails = async (req: any, res: Response) => {
        try {
            const { phoneNumber, address } = req.body;
            const user = await User.findByIdAndUpdate(
                req.user.id,
                { phoneNumber, address },
                { new: true }
            );
            res.status(200).json({ message: 'Details updated', user });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    };
   
    /**
     * STUDENT - ACADEMIC LOGIC
     */
    export const getMyAttendance = async (req: any, res: Response) => {
        try {
            const records = await Attendance.find({ student: req.user.id
      }).populate('course', 'title');
            res.status(200).json({ records });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    };
   
    export const getMyResults = async (req: any, res: Response) => {
        try {
            const results = await Grade.find({ student: req.user.id }).populate({
                path: 'exam',
                populate: { path: 'course', select: 'title' }
            });
            res.status(200).json({ results });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    };
   
    /**
     * STUDENT - FINANCIAL LOGIC
     */
    export const getMyFees = async (req: any, res: Response) => {
        try {
            const vouchers = await Fee.find({ student: req.user.id }).sort({
      dueDate: -1 });
            res.status(200).json({ vouchers });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    };
