const express = require('express');
const router = express.Router();
const productService = require('../services/productService');

// Get all products with pagination
router.get('/', async (req, res) => {
  try {
    const { limit = 100, skip = 0 } = req.query;
    const products = await productService.getAllProducts(limit, skip);
    res.json(products);
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to fetch products',
      details: error.message 
    });
  }
});

// Get single product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(error.response?.status || 500).json({ 
      error: 'Failed to fetch product',
      details: error.message 
    });
  }
});

// Search products
router.get('/search/:query', async (req, res) => {
  try {
    const products = await productService.searchProducts(req.params.query);
    res.json(products);
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to search products',
      details: error.message 
    });
  }
});

// Get products by category
router.get('/category/:category', async (req, res) => {
  try {
    const products = await productService.getProductsByCategory(req.params.category);
    res.json(products);
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to fetch category products',
      details: error.message 
    });
  }
});

// Get all categories
router.get('/categories/all', async (req, res) => {
  try {
    const categories = await productService.getAllCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to fetch categories',
      details: error.message 
    });
  }
});

module.exports = router;
