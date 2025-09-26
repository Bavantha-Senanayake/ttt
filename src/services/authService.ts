import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_CONFIG, STORAGE_KEYS, MESSAGES } from '../utils/constants';
import { LoginRequest, LoginResponse, User } from '../types/auth';
import { UserProfileResponse } from '../types/user';

interface StoredAuthData {
  token: string;
  user: User;
}

class AuthService {
  // Login user with mobile and password
  async login(mobile: string, password: string): Promise<LoginResponse> {
    try {
      const response = await api.post<LoginResponse>(API_CONFIG.ENDPOINTS.LOGIN, {
        mobile,
        password,
      });
console.log('Login successful:', response);
      const { user, token } = response.data;
      
      // Store authentication data
      await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
      await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(user));

      return response.data;
    } catch (error: any) {
      console.error('Login error:', error);
      const message = error.response?.data?.message || MESSAGES.ERROR.LOGIN_FAILED;
      throw new Error(message);
    }
  }

  // Logout user and clear stored data
  async logout(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      await AsyncStorage.removeItem(STORAGE_KEYS.USER_DATA);
    } catch (error) {
      console.error('Error during logout:', error);
      throw new Error('Logout failed');
    }
  }

  // Check if user has valid stored authentication
  async checkStoredAuth(): Promise<StoredAuthData | null> {
    try {
      const token = await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      const userData = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);

      if (token && userData) {
        return {
          token,
          user: JSON.parse(userData) as User,
        };
      }
      return null;
    } catch (error) {
      console.error('Error checking stored auth:', error);
      return null;
    }
  }

  // Get current auth token
  async getToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  }

  // Get current user data
  async getCurrentUser(): Promise<User | null> {
    try {
      const userData = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
      return userData ? (JSON.parse(userData) as User) : null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  // Fetch user profile from API
  async getUserProfile(): Promise<UserProfileResponse> {
    try {
      const response = await api.get<UserProfileResponse>(API_CONFIG.ENDPOINTS.USER_PROFILE);
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || MESSAGES.ERROR.GENERIC;
      throw new Error(message);
    }
  }

  // Update user profile
  async updateUserProfile(profileData: Record<string, any>): Promise<UserProfileResponse> {
    try {
      const response = await api.put<UserProfileResponse>(API_CONFIG.ENDPOINTS.USER_PROFILE, profileData);
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || MESSAGES.ERROR.GENERIC;
      throw new Error(message);
    }
  }
}

// Export singleton instance
export default new AuthService();