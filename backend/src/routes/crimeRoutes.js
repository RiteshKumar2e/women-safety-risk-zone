import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import { requireRoles, ROLES } from '../middleware/roleGuard.js';
import {
  createCrimeRecord,
  listCrimeRecords
} from '../controllers/crimeController.js';

const router = Router();

// Only ADMIN / POLICE can insert crime data
router.post(
  '/',
  auth,
  requireRoles(ROLES.ADMIN, ROLES.POLICE),
  createCrimeRecord
);

// View crimes
router.get('/', auth, listCrimeRecords);

export default router;
