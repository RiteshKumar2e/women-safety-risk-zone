import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import './config/db.js';

import authRoutes from './routes/authRoutes.js';
import crimeRoutes from './routes/crimeRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import riskRoutes from './routes/riskRoutes.js';
import routeRoutes from './routes/routeRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/v1/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/crimes', crimeRoutes);
app.use('/api/v1/reports', reportRoutes);
app.use('/api/v1/risk', riskRoutes);
app.use('/api/v1/routes', routeRoutes);
app.use('/api/v1/analytics', analyticsRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
