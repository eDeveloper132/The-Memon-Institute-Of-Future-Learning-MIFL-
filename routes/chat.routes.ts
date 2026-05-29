import { Router } from 'express';
import {
    createGroup,
    getUserGroups,
    getAllowedContacts,
    getChatHistory,
    sendMessage
} from '../controllers/chat.controller.js';
import { verifyToken } from '../middlewares/auth.js';

const router = Router();

router.use(verifyToken);

// Group Management
router.post('/groups', createGroup);
router.get('/groups', getUserGroups);

// Contacts & DMs
router.get('/contacts', getAllowedContacts);

// Messaging & History
router.get('/messages', getChatHistory);
router.post('/messages', sendMessage);

export default router;
