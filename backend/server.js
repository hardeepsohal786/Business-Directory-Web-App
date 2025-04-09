const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const businessRoutes = require('./routes/businessRoutes');
const financialRoutes = require('./routes/financialRoutes');
const messageRoutes = require('./routes/messages');
const productRoutes = require('./routes/products');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/businesses', businessRoutes);
app.use('/api/financials', financialRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/products', productRoutes);

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/business-directory')
  .then(() => {
    app.listen(5000, () => console.log('Server running on http://localhost:5000'));
  })
  .catch(err => console.error(err));
