// // client/src/api/api.js
// import axios from 'axios';

// const API_BASE_URL = 'http://localhost:5000/api';

// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// export const fetchProducts = async () => {
//   const { data } = await api.get('/products');
//   return data;
// };

// export const fetchFeaturedProducts = async () => {
//   const { data } = await api.get('/products');
//   return data.filter(product => product.featured);
// };

// export const fetchProductById = async (id) => {
//   const { data } = await api.get(`/products/${id}`);
//   return data;
// };

// export const createOrder = async (orderData) => {
//   const { data } = await api.post('/orders', orderData);
//   return data;
// };

// // Error handling interceptor
// api.interceptors.response.use(
//   response => response,
//   error => {
//     console.error('API Error:', error);
//     throw error;
//   }
// );



import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const productApi = {
  // Get all products with pagination
  getAllProducts: async (page = 1, limit = 30) => {
    const skip = (page - 1) * limit;
    const response = await api.get(`/products?limit=${limit}&skip=${skip}`);
    return response.data;
  },

  // Get single product
  getProduct: async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  // Search products
  searchProducts: async (query) => {
    const response = await api.get(`/products/search/${encodeURIComponent(query)}`);
    return response.data;
  },

  // Get products by category
  getProductsByCategory: async (category) => {
    const response = await api.get(`/products/category/${encodeURIComponent(category)}`);
    return response.data;
  },

  // Get all categories
  getAllCategories: async () => {
    const response = await api.get('/products/categories');
    return response.data;
  },
  //checking out
  Checkout: async (orderData) => {
    const response = await api.post('/orders', orderData);
    return response.data;
  }  
};

// Usage with React Query
import { useQuery } from 'react-query';

export const useProducts = (page = 1, limit = 30) => {
  return useQuery(
    ['products', page, limit],
    () => productApi.getAllProducts(page, limit),
    {
      keepPreviousData: true,
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );
};

export const useProduct = (id) => {
  return useQuery(
    ['product', id],
    () => productApi.getProduct(id),
    {
      enabled: !!id,
      staleTime: 5 * 60 * 1000,
    }
  );
};

export const useCategories = () => {
  return useQuery(
    'categories',
    productApi.getAllCategories,
    {
      staleTime: 24 * 60 * 60 * 1000, // 24 hours
    }
  );
}