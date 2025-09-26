// API Configuration
export interface ApiConfig {
  BASE_URL: string;
  TIMEOUT: number;
  ENDPOINTS: {
    LOGIN: string;
    USER_PROFILE: string;
    LOGOUT: string;
    // Post endpoints
    POSTS: string;
    POST_ADD: string;
    POST_DETAIL: string;
    POST_UPDATE: string;
    POST_DELETE: string;
  };
}

export const API_CONFIG: ApiConfig = {
  BASE_URL: 'http://10.0.2.2:3001/api',
  TIMEOUT: 10000,
  ENDPOINTS: {
    LOGIN: '/users/login',
    USER_PROFILE: '/users/me',
    LOGOUT: '/users/logout',
    // Post endpoints
    POSTS: '/posts',
    POST_ADD: '/post/add',
    POST_DETAIL: '/posts/:id',
    POST_UPDATE: '/posts/:id',
    POST_DELETE: '/posts/:id',
  },
};

// Storage Keys
export interface StorageKeys {
  AUTH_TOKEN: string;
  USER_DATA: string;
}

export const STORAGE_KEYS: StorageKeys = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
};

// App Colors
export interface Colors {
  PRIMARY: string;
  PRIMARY_LIGHT: string;
  PRIMARY_DARK: string;
  SUCCESS: string;
  ERROR: string;
  WARNING: string;
  GRAY: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
  WHITE: string;
  BLACK: string;
}

export const COLORS: Colors = {
  PRIMARY: '#2563EB',
  PRIMARY_LIGHT: '#3B82F6',
  PRIMARY_DARK: '#1D4ED8',
  SUCCESS: '#10B981',
  ERROR: '#EF4444',
  WARNING: '#F59E0B',
  GRAY: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
  WHITE: '#FFFFFF',
  BLACK: '#000000',
};

// App Dimensions
export interface Dimensions {
  SCREEN_PADDING: number;
  BUTTON_HEIGHT: number;
  INPUT_HEIGHT: number;
  BORDER_RADIUS: {
    SMALL: number;
    MEDIUM: number;
    LARGE: number;
    XLARGE: number;
  };
}

export const DIMENSIONS: Dimensions = {
  SCREEN_PADDING: 24,
  BUTTON_HEIGHT: 48,
  INPUT_HEIGHT: 48,
  BORDER_RADIUS: {
    SMALL: 6,
    MEDIUM: 8,
    LARGE: 12,
    XLARGE: 16,
  },
};

// Typography
export interface Typography {
  FONT_SIZES: {
    XS: number;
    SM: number;
    BASE: number;
    LG: number;
    XL: number;
    XXL: number;
    XXXL: number;
  };
  FONT_WEIGHTS: {
    NORMAL: string;
    MEDIUM: string;
    SEMIBOLD: string;
    BOLD: string;
  };
}

export const TYPOGRAPHY: Typography = {
  FONT_SIZES: {
    XS: 12,
    SM: 14,
    BASE: 16,
    LG: 18,
    XL: 20,
    XXL: 24,
    XXXL: 30,
  },
  FONT_WEIGHTS: {
    NORMAL: '400',
    MEDIUM: '500',
    SEMIBOLD: '600',
    BOLD: '700',
  },
};

// Form Validation
export interface Validation {
  MOBILE: {
    MIN_LENGTH: number;
    MAX_LENGTH: number;
    PATTERN: RegExp;
  };
  PASSWORD: {
    MIN_LENGTH: number;
    MAX_LENGTH: number;
  };
  POST: {
    TITLE_MIN_LENGTH: number;
    TITLE_MAX_LENGTH: number;
    CONTENT_MIN_LENGTH: number;
    CONTENT_MAX_LENGTH: number;
    MAX_TAGS: number;
  };
}

export const VALIDATION: Validation = {
  MOBILE: {
    MIN_LENGTH: 10,
    MAX_LENGTH: 10,
    PATTERN: /^\d{10}$/,
  },
  PASSWORD: {
    MIN_LENGTH: 6,
    MAX_LENGTH: 50,
  },
  POST: {
    TITLE_MIN_LENGTH: 3,
    TITLE_MAX_LENGTH: 200,
    CONTENT_MIN_LENGTH: 10,
    CONTENT_MAX_LENGTH: 5000,
    MAX_TAGS: 10,
  },
};

// App Configuration
export interface AppConfig {
  NAME: string;
  VERSION: string;
  ENVIRONMENT: string;
}

export const APP_CONFIG: AppConfig = {
  NAME: 'OnDemand App',
  VERSION: '1.0.0',
  ENVIRONMENT: __DEV__ ? 'development' : 'production',
};

// Animation Durations
export interface Animations {
  FAST: number;
  NORMAL: number;
  SLOW: number;
}

export const ANIMATIONS: Animations = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
};

// Default Messages
export interface Messages {
  ERROR: {
    NETWORK: string;
    GENERIC: string;
    LOGIN_FAILED: string;
    TOKEN_EXPIRED: string;
  };
  SUCCESS: {
    LOGIN: string;
    LOGOUT: string;
    PROFILE_UPDATED: string;
  };
  VALIDATION: {
    MOBILE_REQUIRED: string;
    MOBILE_INVALID: string;
    PASSWORD_REQUIRED: string;
    PASSWORD_MIN_LENGTH: string;
    // Post validation messages
    TITLE_REQUIRED: string;
    TITLE_MIN_LENGTH: string;
    TITLE_MAX_LENGTH: string;
    CONTENT_REQUIRED: string;
    CONTENT_MIN_LENGTH: string;
    CONTENT_MAX_LENGTH: string;
    CATEGORY_REQUIRED: string;
  };
}

export const MESSAGES: Messages = {
  ERROR: {
    NETWORK: 'Network error. Please check your connection.',
    GENERIC: 'Something went wrong. Please try again.',
    LOGIN_FAILED: 'Login failed. Please check your credentials.',
    TOKEN_EXPIRED: 'Session expired. Please login again.',
  },
  SUCCESS: {
    LOGIN: 'Login successful!',
    LOGOUT: 'Logged out successfully.',
    PROFILE_UPDATED: 'Profile updated successfully.',
  },
  VALIDATION: {
    MOBILE_REQUIRED: 'Mobile number is required',
    MOBILE_INVALID: 'Please enter a valid 10-digit mobile number',
    PASSWORD_REQUIRED: 'Password is required',
    PASSWORD_MIN_LENGTH: 'Password must be at least 6 characters',
    // Post validation messages
    TITLE_REQUIRED: 'Post title is required',
    TITLE_MIN_LENGTH: 'Title must be at least 3 characters',
    TITLE_MAX_LENGTH: 'Title must not exceed 200 characters',
    CONTENT_REQUIRED: 'Post content is required',
    CONTENT_MIN_LENGTH: 'Content must be at least 10 characters',
    CONTENT_MAX_LENGTH: 'Content must not exceed 5000 characters',
    CATEGORY_REQUIRED: 'Please select a category',
  },
};

// Worker Categories
export const WORKER_CATEGORIES = [
  { id: 'cleaning', name: 'Cleaning', icon: '🧹', color: '#10B981', workerCount: 245 },
  { id: 'plumbing', name: 'Plumbing', icon: '🔧', color: '#3B82F6', workerCount: 189 },
  { id: 'electrical', name: 'Electrical', icon: '⚡', color: '#F59E0B', workerCount: 156 },
  { id: 'carpentry', name: 'Carpentry', icon: '🔨', color: '#8B5CF6', workerCount: 123 },
  { id: 'painting', name: 'Painting', icon: '🎨', color: '#EF4444', workerCount: 201 },
  { id: 'gardening', name: 'Gardening', icon: '🌱', color: '#059669', workerCount: 178 },
  { id: 'appliance', name: 'Appliance Repair', icon: '📱', color: '#6B7280', workerCount: 145 },
  { id: 'moving', name: 'Moving & Packing', icon: '📦', color: '#F97316', workerCount: 98 },
];

// Mock Workers Data
export const MOCK_WORKERS = [
  {
    id: '1',
    name: 'John Smith',
    category: 'plumbing',
    rating: 4.8,
    reviewCount: 127,
    hourlyRate: 45,
    location: 'Downtown',
    distance: 2.3,
    skills: ['Emergency Repairs', 'Installation', 'Maintenance'],
    isAvailable: true,
    isVerified: true,
    completedJobs: 234,
    responseTime: '15 min',
    description: 'Professional plumber with 8+ years experience',
  },
  {
    id: '2', 
    name: 'Sarah Johnson',
    category: 'cleaning',
    rating: 4.9,
    reviewCount: 203,
    hourlyRate: 25,
    location: 'Midtown',
    distance: 1.8,
    skills: ['Deep Cleaning', 'Regular Maintenance', 'Eco-Friendly'],
    isAvailable: true,
    isVerified: true,
    completedJobs: 456,
    responseTime: '10 min',
    description: 'Reliable cleaning service with attention to detail',
  },
  {
    id: '3',
    name: 'Mike Wilson',
    category: 'electrical',
    rating: 4.7,
    reviewCount: 89,
    hourlyRate: 55,
    location: 'Uptown',
    distance: 3.1,
    skills: ['Wiring', 'Smart Home', 'Safety Inspection'],
    isAvailable: false,
    isVerified: true,
    completedJobs: 178,
    responseTime: '30 min',
    description: 'Licensed electrician specializing in modern solutions',
  },
];