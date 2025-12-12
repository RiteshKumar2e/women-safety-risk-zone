
import CrimeRecord from '../models/CrimeRecord.js';

export const createCrimeRecord = async (req, res, next) => {
  try {
    const { cityKey, location, crimeType, occurredAt, source } = req.body;

    const record = await CrimeRecord.create({
      cityKey,
      location,
      crimeType,
      occurredAt: new Date(occurredAt),
      source: source || 'OFFICIAL'
    });

    res.status(201).json(record);
  } catch (err) {
    next(err);
  }
};

export const listCrimeRecords = async (req, res, next) => {
  try {
    const { cityKey, fromDate, toDate } = req.query;
    const filter = {};

    if (cityKey) filter.cityKey = cityKey;

    if (fromDate || toDate) {
      filter.occurredAt = {};
      if (fromDate) filter.occurredAt.$gte = new Date(fromDate);
      if (toDate) filter.occurredAt.$lte = new Date(toDate);
    }

    const data = await CrimeRecord.find(filter)
      .sort({ occurredAt: -1 })
      .limit(500);

    res.json(data);
  } catch (err) {
    next(err);
  }
};
