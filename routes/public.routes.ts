import { Router } from 'express';
import { getInformationCenterData } from '../controllers/public.controller.js';

const router = Router();

/**
 * Public Information Center Data
 */
router.get('/information-center', getInformationCenterData);

export default router;
