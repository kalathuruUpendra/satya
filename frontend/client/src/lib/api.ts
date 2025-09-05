import axios from 'axios';

// API configuration for communicating with backend
const API_BASE_URL = 'http://localhost:5000';

// Create axios instance with default configuration
export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth headers
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('satyasri_auth_token');
  console.log('API Request:', config.method?.toUpperCase(), config.url);
  console.log('Token present:', !!token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('Authorization header added');
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.status, error.response?.data, error.config?.url);
    if (error.response?.status === 401) {
      console.log('Unauthorized - clearing auth and redirecting');
      localStorage.removeItem('satyasri_auth_token');
      localStorage.removeItem('satyasri_user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Legacy function for compatibility
export const apiRequest = async (method: string, endpoint: string, data?: any) => {
  const response = await api.request({
    method,
    url: endpoint,
    data,
  });
  return response;
};

export { API_BASE_URL };