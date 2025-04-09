const FinancialData = require('../models/FinancialData');

exports.addFinancials = async (req, res) => {
  try {
    const data = new FinancialData({ ...req.body });
    await data.save();
    res.json(data);
  } catch (err) {
    res.status(400).json({ error: 'Error saving financial data' });
  }
};

exports.getByBusiness = async (req, res) => {
  const data = await FinancialData.findOne({ businessId: req.params.id });
  res.json(data);
};
