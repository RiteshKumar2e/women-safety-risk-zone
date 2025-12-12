import {
  computeTopRiskZones,
  getRiskTrend as getRiskTrendService
} from '../services/riskAggregationService.js';

export const getTopRiskZones = async (req, res, next) => {
  try {
    const { cityKey } = req.query;
    const data = await computeTopRiskZones({ cityKey, limit: 10 });
    res.json(data);
  } catch (err) {
    next(err);
  }
};

export const getRiskTrend = async (req, res, next) => {
  try {
    const { cityKey } = req.query;
    const data = await getRiskTrendService({ cityKey });
    res.json(data);
  } catch (err) {
    next(err);
  }
};
