import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { handleTokenRefresh } from '../../utils/tokenManager';

// Configure axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  withCredentials: true // Send cookies with requests
});

// Create a separate axios instance for refresh token requests to avoid circular dependency
const refreshApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  withCredentials: true
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors globally with refresh token logic
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If token is invalid or expired, try to refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      console.log('🚫 Received 401 error, attempting token refresh...');
      originalRequest._retry = true;
      
      const refreshTokenValue = localStorage.getItem('refreshToken');
      if (refreshTokenValue) {
        try {
          // Use the token manager to handle refresh
          const updatedRequest = await handleTokenRefresh(originalRequest);
          console.log('🔄 Retrying original request with new token...');
          return api(updatedRequest);
        } catch (refreshError) {
          console.error('❌ Token refresh failed:', refreshError);
          // Refresh failed, redirect to login
          if (window.location.pathname !== '/login' && window.location.pathname !== '/signup') {
            console.log('🔄 Redirecting to login page...');
            window.location.href = '/login';
          }
          return Promise.reject(refreshError);
        }
      } else {
        console.log('❌ No refresh token found, redirecting to login...');
        // No refresh token, redirect to login
        if (window.location.pathname !== '/login' && window.location.pathname !== '/signup') {
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    }
    
    return Promise.reject(error);
  }
);

// Login Thunk
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      
      // Ensure we have the expected response structure
      if (!response.data.token || !response.data.user) {
        throw new Error('Invalid response from server');
      }
      
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Login failed'
      );
    }
  }
);

// Signup Thunk
export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async ({ email, password, fullName }, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/signup', { 
        email, 
        password, 
        name: fullName  // Map fullName to name for backend
      });
      
      // Ensure we have the expected response structure
      if (!response.data.token || !response.data.user) {
        throw new Error('Invalid response from server');
      }
      
      return response.data;
    } catch (error) {
      console.error('Signup error:', error);
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Signup failed'
      );
    }
  }
);

// Token Validation Thunk
export const validateToken = createAsyncThunk(
  'auth/validateToken',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        // No token found - this is normal for first-time visitors
        // Don't treat this as an error, just return null to indicate no authentication
        return null;
      }

      const response = await api.get('/auth/validate-token');
      
      // Ensure we have the expected response structure
      if (!response.data.user) {
        throw new Error('Invalid response from server');
      }
      
      return response.data.user;
    } catch (error) {
      console.error('Token validation error:', error);
      // Clear invalid tokens from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Token validation failed'
      );
    }
  }
);


// Logout Thunk
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      const refreshTokenValue = localStorage.getItem('refreshToken');
      if (refreshTokenValue) {
        await api.post('/auth/logout', { refreshToken: refreshTokenValue });
      }
      
      // Clear tokens from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      
      return { message: 'Logged out successfully' };
    } catch (error) {
      console.error('Logout error:', error);
      // Even if logout fails on server, clear local tokens
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Logout failed'
      );
    }
  }
);