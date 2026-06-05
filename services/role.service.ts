import { User } from '../schemas/models/user.model.js';
import { RoleChangeLog } from '../schemas/models/roleChangeLog.model.js';
import { NotificationService } from './notification.service.js';
import type { UserRole } from '../schemas/types/user.type.js';
import mongoose from 'mongoose';
import chalk from 'chalk';

export class RoleService {
    /**
     * Transition a user to a new role with auditing and notification
     */
    static async transition(params: {
        userId: string;
        newRole: UserRole;
        trigger: string;
        reason?: string;
        changedBy?: string;
    }): Promise<void> {
        const { userId, newRole, trigger, reason, changedBy } = params;

        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            // 1. Fetch user to get old role
            const user = await User.findById(userId).session(session);
            if (!user) throw new Error('User not found');

            const oldRole = user.role;

            if (oldRole === newRole) {
                await session.abortTransaction();
                return;
            }

            // 2. Update User role
            user.role = newRole;
            await user.save({ session });

            // 3. Log the change
            const logData: any = {
                user: userId,
                oldRole,
                newRole,
                trigger,
                reason
            };
            if (changedBy) logData.changedBy = changedBy;

            await RoleChangeLog.create([logData], { session });

            // 4. Commit transaction
            await session.commitTransaction();
            console.log(chalk.green(`[Role Service] Transitioned user ${userId} from ${oldRole} to ${newRole}`));

            // 5. Notify user (outside transaction to avoid blocking)
            await NotificationService.send({
                recipient: new mongoose.Types.ObjectId(userId) as any,
                type: 'SYSTEM',
                title: 'Account Role Updated',
                content: `Your account role has been changed from ${oldRole} to ${newRole}.`,
                data: { oldRole, newRole, trigger },
                priority: 'high'
            });

        } catch (error: any) {
            await session.abortTransaction();
            console.error(chalk.red('[Role Service] Transition failed:'), error);
            throw error;
        } finally {
            session.endSession();
        }
    }
}
