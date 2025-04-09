const productSchema = new mongoose.Schema({
    businessId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: String,
    description: String,
    price: Number,
    available: Boolean
  });
  
  module.exports = mongoose.model('Product', productSchema);