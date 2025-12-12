import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import { requireRoles, ROLES } from '../middleware/roleGuard.js';
import {
  getTopRiskZones,
  getRiskTrend
} from '../controllers/analyticsController.js';

const router = Router();

router.get(
  '/top-zones',
  auth,
  requireRoles(ROLES.ADMIN, ROLES.POLICE, ROLES.NGO),
  getTopRiskZones
);

router.get(
  '/risk-trend',
  auth,
  requireRoles(ROLES.ADMIN, ROLES.POLICE, ROLES.NGO),
  getRiskTrend
);

export default router;
