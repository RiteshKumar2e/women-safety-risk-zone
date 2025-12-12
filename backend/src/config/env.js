import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 5000;
export const MONGO_URI =
  process.env.MONGO_URI || 'mongodb://localhost:27017/women_safety';
export const JWT_SECRET =
  process.env.JWT_SECRET || 'dev_secret_change_me_in_prod';
export const ML_SERVICE_URL =
  process.env.ML_SERVICE_URL || 'http://localhost:8001';
