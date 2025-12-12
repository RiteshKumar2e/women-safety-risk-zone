export function riskLevelFromScore(score) {
  if (score <= 30) return 'LOW';
  if (score <= 70) return 'MEDIUM';
  return 'HIGH';
}

export function riskColor(level) {
  switch (level) {
    case 'LOW':
      return '#16a34a';
    case 'MEDIUM':
      return '#f59e0b';
    case 'HIGH':
      return '#dc2626';
    default:
      return '#6b7280';
  }
}
