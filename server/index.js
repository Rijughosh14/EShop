// server/index.js
const express = require('express');
const cors = require('cors');
const productsRouter = require('./routes/product');
const ordersRouter = require('./routes/order');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Cache middleware
const cacheMiddleware = (duration) => {
  return (req, res, next) => {
    res.setHeader('Cache-Control', `public, max-age=${duration}`);
    next();
  };
};

// Routes with caching
app.use('/api/products', cacheMiddleware(300), productsRouter); // Cache for 5 minutes
app.use('/api/orders', ordersRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something broke!',
    details: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});