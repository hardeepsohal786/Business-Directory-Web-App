const Business = require('../models/Business');

exports.createProfile = async (req, res) => {
  try {
    const business = new Business({ userId: req.user.id, ...req.body });
    await business.save();
    res.json(business);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create profile' });
  }
};

exports.getAll = async (req, res) => {
  const businesses = await Business.find();
  res.json(businesses);
};

exports.getById = async (req, res) => {
  const business = await Business.findById(req.params.id);
  res.json(business);
};
