import mongoose from 'mongoose';

const routeRiskLogSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
    source: {
      lat: Number,
      lng: Number
    },
    destination: {
      lat: Number,
      lng: Number
    },
    departureTime: Date,
    overallRiskScore: Number,
    overallRiskLevel: {
      type: String,
      enum: ['LOW', 'MEDIUM', 'HIGH']
    }
  },
  { timestamps: true }
);

const RouteRiskLog = mongoose.model('RouteRiskLog', routeRiskLogSchema);
export default RouteRiskLog;
