import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import { requireRoles, ROLES } from '../middleware/roleGuard.js';
import {
  createReport,
  listReports,
  updateReportStatus
} from '../controllers/reportController.js';

const router = Router();

router.post('/', auth, createReport);
router.get('/', auth, listReports);
router.patch(
  '/:id/status',
  auth,
  requireRoles(ROLES.ADMIN, ROLES.POLICE, ROLES.NGO),
  updateReportStatus
);

export default router;
