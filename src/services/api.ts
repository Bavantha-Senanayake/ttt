import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_CONFIG, STORAGE_KEYS, MESSAGES } from '../utils/constants';

// Create axios instance with base configuration
const api: AxiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error getting auth token:', error);
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const { response } = error;
    
    // Handle 401 Unauthorized - token expired or invalid
    if (response?.status === 401) {
      try {
        await AsyncStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
        await AsyncStorage.removeItem(STORAGE_KEYS.USER_DATA);
        // You can dispatch a logout action here if needed
        // store.dispatch(logoutUser());
      } catch (storageError) {
        console.error('Error clearing storage:', storageError);
      }
    }
    
    // Handle network errors
    if (!response) {
      error.message = MESSAGES.ERROR.NETWORK;
    }
    
    return Promise.reject(error);
  }
);

export default api;