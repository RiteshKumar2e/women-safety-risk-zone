import { predictZoneRisk } from '../services/mlServiceClient.js';

export const getRiskGrid = async (req, res, next) => {
  try {
    const { cityKey, hour, dayOfWeek } = req.query;

    const payload = {
      cityKey,
      hour: Number(hour ?? 20),
      dayOfWeek: Number(dayOfWeek ?? 5)
    };

    const result = await predictZoneRisk(payload);
    res.json(result);
  } catch (err) {
    next(err);
  }
};
