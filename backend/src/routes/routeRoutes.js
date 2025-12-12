import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import { analyzeRoute } from '../controllers/routeController.js';

const router = Router();

// POST /api/v1/routes/analyze
router.post('/analyze', auth, analyzeRoute);

export default router;
