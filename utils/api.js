// utils/api.js
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    if (error.code === 'ECONNREFUSED') {
      throw new Error('Backend server is not running. Please start your backend server on localhost:5000');
    }
    if (error.response?.status === 404) {
      throw new Error('API endpoint not found');
    }
    throw error;
  }
);

export const toursAPI = {
  getAll: () => api.get('/tours'),
  getById: (id) => api.get(`/tours/${id}`),
};

export default api;