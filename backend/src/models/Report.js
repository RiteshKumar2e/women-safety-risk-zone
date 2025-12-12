import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
    anonymous: { type: Boolean, default: true },
    location: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true }
    },
    cityKey: { type: String, required: false },
    category: {
      type: String,
      enum: ['harassment', 'poor_lighting', 'suspicious_gatherings', 'past_incident'],
      required: true
    },
    incidentTime: { type: Date, required: true },
    description: { type: String },
    status: {
      type: String,
      enum: ['PENDING', 'APPROVED', 'REJECTED'],
      default: 'PENDING'
    },
    riskLevel: {
      type: String,
      enum: ['LOW', 'MEDIUM', 'HIGH'],
      default: 'LOW'
    },
    riskScore: { type: Number, min: 0, max: 100 }
  },
  { timestamps: true }
);

reportSchema.index({ cityKey: 1 });
reportSchema.index({ incidentTime: -1 });
reportSchema.index({ 'location.lat': 1, 'location.lng': 1 });

const Report = mongoose.model('Report', reportSchema);
export default Report;
