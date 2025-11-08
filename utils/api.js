// utils/api.js
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor for adding auth token (optional)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// Tours API
export const toursAPI = {
  getAll: () => api.get('/tours'),
  getById: (id) => api.get(`/tours/${id}`),
  create: (data) => api.post('/tours', data),
  update: (id, data) => api.put(`/tours/${id}`, data),
  delete: (id) => api.delete(`/tours/${id}`),
};

// Admin Tour Places API
export const adminTourPlacesAPI = {
  create: (data) => api.post('/admin/tour-places', data),
  getDistricts: () => api.get('/admin/tour-places/districts'),
};


// Users API
export const usersAPI = {
  getAll: () => api.get('/users'),
  getById: (id) => api.get(`/users/${id}`),
  create: (data) => api.post('/users', data),
  update: (id, data) => api.put(`/users/${id}`, data),
  delete: (id) => api.delete(`/users/${id}`),
  login: (data) => api.post('/users/login', data), // Optional auth
};

// Bookings API
export const bookingsAPI = {
  getAll: () => api.get('/bookings'),
  getByUser: (userId) => api.get(`/bookings/user/${userId}`),
  create: (data) => api.post('/bookings', data),
  update: (id, data) => api.put(`/bookings/${id}`, data),
  delete: (id) => api.delete(`/bookings/${id}`),
};

// Reviews API
export const reviewsAPI = {
  getByTour: (tourId) => api.get(`/reviews/tour/${tourId}`),
  create: (data) => api.post('/reviews', data),
};

// Divisions API
export const divisionsAPI = {
  getAll: () => api.get('/divisions'),
  create: (data) => api.post('/divisions', data),
  update: (id, data) => api.put(`/divisions/${id}`, data),
  delete: (id) => api.delete(`/divisions/${id}`),
};

// Districts API
export const districtsAPI = {
  getAll: () => api.get('/districts'),
  getByDivision: (divisionId) => api.get(`/districts/division/${divisionId}`),
  create: (data) => api.post('/districts', data),
  update: (id, data) => api.put(`/districts/${id}`, data),
  delete: (id) => api.delete(`/districts/${id}`),
};

// Tour Places API
export const tourPlacesAPI = {
  getAll: () => api.get('/tour-places'),
  getByDistrict: (districtId) => api.get(`/tour-places/district/${districtId}`),
  create: (data) => api.post('/tour-places', data),
  update: (id, data) => api.put(`/tour-places/${id}`, data),
  delete: (id) => api.delete(`/tour-places/${id}`),
  addReview: (id, data) => api.post(`/tour-places/${id}/reviews`, data),
};

// Trending Places API
export const trendingPlacesAPI = {
  getAll: (limit = 10) => api.get(`/trending-places?limit=${limit}`),
};

export default api;
