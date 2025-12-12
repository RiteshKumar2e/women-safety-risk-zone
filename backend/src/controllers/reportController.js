import Report from '../models/Report.js';

export const createReport = async (req, res, next) => {
  try {
    const { location, category, time, description, anonymous, cityKey } = req.body;

    const report = await Report.create({
      userId: anonymous ? null : req.user?.id,
      anonymous: Boolean(anonymous),
      location,
      category,
      incidentTime: new Date(time),
      description,
      cityKey
    });

    res.status(201).json(report);
  } catch (err) {
    next(err);
  }
};

export const listReports = async (req, res, next) => {
  try {
    const { category, status, fromDate, toDate, cityKey } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (status) filter.status = status;
    if (cityKey) filter.cityKey = cityKey;

    if (fromDate || toDate) {
      filter.incidentTime = {};
      if (fromDate) filter.incidentTime.$gte = new Date(fromDate);
      if (toDate) filter.incidentTime.$lte = new Date(toDate);
    }

    const reports = await Report.find(filter)
      .sort({ createdAt: -1 })
      .limit(200);

    res.json(reports);
  } catch (err) {
    next(err);
  }
};

export const updateReportStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, riskLevel, riskScore } = req.body;

    const report = await Report.findByIdAndUpdate(
      id,
      { status, riskLevel, riskScore },
      { new: true }
    );

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    res.json(report);
  } catch (err) {
    next(err);
  }
};
