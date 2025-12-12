import mongoose from 'mongoose';

const riskScoreSchema = new mongoose.Schema(
  {
    cityKey: { type: String, required: true },
    zoneId: { type: String, required: true },
    riskScore: { type: Number, required: true },
    riskLevel: {
      type: String,
      enum: ['LOW', 'MEDIUM', 'HIGH'],
      required: true
    },
    modelVersion: { type: String, required: true }
  },
  { timestamps: true }
);

riskScoreSchema.index({ cityKey: 1, zoneId: 1, createdAt: -1 });

const RiskScore = mongoose.model('RiskScore', riskScoreSchema);
export default RiskScore;
