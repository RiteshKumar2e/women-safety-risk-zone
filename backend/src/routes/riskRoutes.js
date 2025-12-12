import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import { getRiskGrid } from '../controllers/riskController.js';

const router = Router();

// GET /api/v1/risk/grid?cityKey=DELHI&hour=20&dayOfWeek=5
router.get('/grid', auth, getRiskGrid);

export default router;
