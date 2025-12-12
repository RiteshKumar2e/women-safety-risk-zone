import apiClient from './apiClient';

export async function fetchZoneRisk({ lat, lng, hour, dayOfWeek }) {
  const res = await apiClient.get('/risk/zone', {
    params: { lat, lng, hour, dayOfWeek },
  });
  return res.data;
}

export async function fetchGridRisk({ bbox, hour, dayOfWeek }) {
  const res = await apiClient.get('/risk/grid', {
    params: { bbox: bbox.join(','), hour, dayOfWeek },
  });
  return res.data;
}

export async function analyzeRoute(payload) {
  const res = await apiClient.post('/routes/analyze', payload);
  return res.data;
}

export async function createReport(payload) {
  const res = await apiClient.post('/reports', payload);
  return res.data;
}

export async function getReports(params = {}) {
  const res = await apiClient.get('/reports', { params });
  return res.data;
}
