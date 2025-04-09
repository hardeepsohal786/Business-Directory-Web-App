const Product = require('../models/Product');

// Create product
router.post('/', verifyToken, async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get products by business
router.get('/business/:id', async (req, res) => {
  try {
    const products = await Product.find({ businessId: req.params.id });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;