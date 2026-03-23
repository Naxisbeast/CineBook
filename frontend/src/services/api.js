// frontend/src/services/api.js
// Axios instance pre-configured for the CineBook backend API.
// A request interceptor automatically attaches the JWT token stored in
// localStorage to the Authorization header of every outgoing request.

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Attach JWT token to every request if present
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
