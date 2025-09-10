// Token management utilities
import axios from 'axios';

// Function to update Redux state (will be set by the app)
let updateAuthState = null;

export const setUpdateAuthState = (updateFn) => {
  updateAuthState = updateFn;
};

// Global variable to prevent multiple simultaneous refresh attempts
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  
  failedQueue = [];
};

// Create a separate axios instance for refresh token requests
const refreshApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  withCredentials: true
});

export const handleTokenRefresh = async (originalRequest) => {
  console.log('🔄 Attempting to refresh token...');
  
  if (isRefreshing) {
    console.log('⏳ Token refresh already in progress, queuing request...');
    // If already refreshing, queue the request
    return new Promise((resolve, reject) => {
      failedQueue.push({ resolve, reject });
    }).then(token => {
      originalRequest.headers.Authorization = `Bearer ${token}`;
      return originalRequest;
    }).catch(err => {
      return Promise.reject(err);
    });
  }

  isRefreshing = true;

  try {
    const refreshTokenValue = localStorage.getItem('refreshToken');
    if (!refreshTokenValue) {
      throw new Error('No refresh token found');
    }

    const response = await refreshApi.post('/auth/refresh-token', { 
      refreshToken: refreshTokenValue 
    });
    
    const { accessToken, refreshToken: newRefreshToken } = response.data;
    
    // Update tokens in localStorage
    localStorage.setItem('token', accessToken);
    localStorage.setItem('refreshToken', newRefreshToken);
    
    // Update Redux state if available
    if (updateAuthState) {
      updateAuthState({ accessToken, refreshToken: newRefreshToken });
    }
    
    console.log('✅ Token refreshed successfully');
    processQueue(null, accessToken);
    originalRequest.headers.Authorization = `Bearer ${accessToken}`;
    return originalRequest;
  } catch (error) {
    console.error('❌ Token refresh error:', error);
    // Clear invalid tokens from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    processQueue(error, null);
    throw error;
  } finally {
    isRefreshing = false;
  }
};
