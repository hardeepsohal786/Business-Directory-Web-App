const mongoose = require('mongoose');

const FinancialDataSchema = new mongoose.Schema({
  businessId: { type: mongoose.Schema.Types.ObjectId, ref: 'Business' },
  revenue: [Number], // yearly revenue
  cagr: Number,
  profitMargin: Number,
  roi: Number,
  customerRetentionRate: Number
});

module.exports = mongoose.model('FinancialData', FinancialDataSchema);
