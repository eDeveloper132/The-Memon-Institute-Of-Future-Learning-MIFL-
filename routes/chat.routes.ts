import { Router } from 'express';
import {
    createGroup,
    getUserGroups,
    getAllowedContacts,
    getChatHistory,
    sendMessage,
    getUnreadCounts,
    uploadAttachment,
    updateGroup,
    deleteMessage,
    syncData
} from '../controllers/chat.controller.js';
import { authenticate, authorize } from '../middlewares/auth.js';
import { chatUpload } from '../middlewares/upload.js';

const router = Router();

router.use(authenticate);

// Group Management
router.post('/groups', createGroup);
router.get('/groups', getUserGroups);
router.patch('/groups/:id', updateGroup);

// Contacts & DMs
router.get('/contacts', getAllowedContacts);

// Messaging & History
router.get('/messages', getChatHistory);
router.get('/unread', getUnreadCounts);
router.get('/sync', syncData);
router.post('/messages', sendMessage);
router.delete('/messages/:id', authorize('admin'), deleteMessage);

// Attachments
router.post('/upload', chatUpload.single('file'), uploadAttachment);

export default router;
