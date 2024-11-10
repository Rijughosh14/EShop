const axios = require('axios');

class ProductService {
  constructor() {
    this.baseURL = 'https://dummyjson.com';
  }

  async getAllProducts(limit = 100, skip = 0) {
    try {
      const response = await axios.get(`${this.baseURL}/products`, {
        params: { limit, skip }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  async getProductById(id) {
    try {
      const response = await axios.get(`${this.baseURL}/products/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      throw error;
    }
  }

  async searchProducts(query) {
    try {
      const response = await axios.get(`${this.baseURL}/products/search`, {
        params: { q: query }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  }

  async getProductsByCategory(category) {
    try {
      const response = await axios.get(`${this.baseURL}/products/category/${category}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching products in category ${category}:`, error);
      throw error;
    }
  }

  async getAllCategories() {
    try {
      const response = await axios.get(`${this.baseURL}/products/category-list`);
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }
}

module.exports = new ProductService();