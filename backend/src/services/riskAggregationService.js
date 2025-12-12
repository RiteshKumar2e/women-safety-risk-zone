import Report from '../models/Report.js';
import RiskScore from '../models/RiskScore.js';

/**
 * Aggregate report-based risk per city or zone
 */
export async function computeTopRiskZones({ cityKey, limit = 10 } = {}) {
  const match = {};
  if (cityKey) match.cityKey = cityKey;
  match.status = 'APPROVED';

  const pipeline = [
    { $match: match },
    {
      $group: {
        _id: '$cityKey',
        avgRisk: { $avg: '$riskScore' },
        count: { $sum: 1 }
      }
    },
    { $sort: { avgRisk: -1, count: -1 } },
    { $limit: limit }
  ];

  return Report.aggregate(pipeline);
}

/**
 * Trend from RiskScore history.
 */
export async function getRiskTrend({ cityKey } = {}) {
  const match = {};
  if (cityKey) match.cityKey = cityKey;

  const pipeline = [
    { $match: match },
    {
      $group: {
        _id: {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' },
          day: { $dayOfMonth: '$createdAt' }
        },
        avgRisk: { $avg: '$riskScore' }
      }
    },
    { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 } }
  ];

  return RiskScore.aggregate(pipeline);
}
