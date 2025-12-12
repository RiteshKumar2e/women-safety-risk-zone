import mongoose from 'mongoose';

const crimeRecordSchema = new mongoose.Schema(
  {
    cityKey: { type: String, required: true },
    location: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true }
    },
    crimeType: { type: String, required: true },
    occurredAt: { type: Date, required: true },
    source: { type: String, default: 'OFFICIAL' }
  },
  { timestamps: true }
);

crimeRecordSchema.index({ cityKey: 1, occurredAt: -1 });

const CrimeRecord = mongoose.model('CrimeRecord', crimeRecordSchema);
export default CrimeRecord;
