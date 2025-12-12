import axios from 'axios';
import { ML_SERVICE_URL } from '../config/env.js';

export async function predictZoneRisk(payload) {
  const res = await axios.post(`${ML_SERVICE_URL}/predict/risk`, payload);
  return res.data; // { zones: [...] }
}

export async function analyzeRouteRisk(payload) {
  const res = await axios.post(`${ML_SERVICE_URL}/predict/route-risk`, payload);
  return res.data; // { overallRiskScore, overallRiskLevel, segments, alternativeRoutes }
}
