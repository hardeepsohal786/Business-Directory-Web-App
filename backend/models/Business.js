const mongoose = require('mongoose');

const BusinessSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  incorporationType: String,
  description: String,
  contact: String,
  industry: String,
  location: String,
  products: [{
    name: String,
    price: Number,
    description: String,
    available: Boolean
  }]
});

module.exports = mongoose.model('Business', BusinessSchema);
