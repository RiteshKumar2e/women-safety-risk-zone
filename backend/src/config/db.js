import mongoose from 'mongoose';
import { MONGO_URI } from './env.js';

if (!MONGO_URI) {
  console.error('❌ MONGO_URI missing in environment');
  process.exit(1);
}

mongoose
  .connect(MONGO_URI, {
    autoIndex: true
  })
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });
