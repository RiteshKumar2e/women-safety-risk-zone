import { analyzeRouteRisk } from '../services/mlServiceClient.js';
import RouteRiskLog from '../models/RouteRiskLog.js';

export const analyzeRoute = async (req, res, next) => {
  try {
    const { source, destination, departureTime, dayOfWeek } = req.body;

    const payload = {
      source,
      destination,
      departureTime,
      dayOfWeek
    };

    const result = await analyzeRouteRisk(payload);

    await RouteRiskLog.create({
      userId: req.user?.id ?? null,
      source,
      destination,
      departureTime: new Date(departureTime),
      overallRiskScore: result.overallRiskScore,
      overallRiskLevel: result.overallRiskLevel
    });

    res.json(result);
  } catch (err) {
    next(err);
  }
};
