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
  BASE_URL: 'https://darkturquoise-deer-214872.hostingersite.com/api',
  TIMEOUT: 10000,
  ENDPOINTS: {
    LOGIN: '/login',
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
    MAX_LENGTH: number;    // 
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
    MAX_LENGTH: 15,   
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

// Sri Lankan Location Data
export const LOCATIONS = {
  PROVINCES: [
    { id: 'western', name: 'Western Province', type: 'province' as const },
    { id: 'central', name: 'Central Province', type: 'province' as const },
    { id: 'southern', name: 'Southern Province', type: 'province' as const },
    { id: 'northern', name: 'Northern Province', type: 'province' as const },
    { id: 'eastern', name: 'Eastern Province', type: 'province' as const },
    { id: 'north-western', name: 'North Western Province', type: 'province' as const },
    { id: 'north-central', name: 'North Central Province', type: 'province' as const },
    { id: 'uva', name: 'Uva Province', type: 'province' as const },
    { id: 'sabaragamuwa', name: 'Sabaragamuwa Province', type: 'province' as const },
  ],
  DISTRICTS: [
    // Western Province
    { id: 'colombo', name: 'Colombo', type: 'district' as const, parentId: 'western' },
    { id: 'gampaha', name: 'Gampaha', type: 'district' as const, parentId: 'western' },
    { id: 'kalutara', name: 'Kalutara', type: 'district' as const, parentId: 'western' },
    
    // Central Province
    { id: 'kandy', name: 'Kandy', type: 'district' as const, parentId: 'central' },
    { id: 'matale', name: 'Matale', type: 'district' as const, parentId: 'central' },
    { id: 'nuwara-eliya', name: 'Nuwara Eliya', type: 'district' as const, parentId: 'central' },
    
    // Southern Province
    { id: 'galle', name: 'Galle', type: 'district' as const, parentId: 'southern' },
    { id: 'matara', name: 'Matara', type: 'district' as const, parentId: 'southern' },
    { id: 'hambantota', name: 'Hambantota', type: 'district' as const, parentId: 'southern' },
    
    // Northern Province
    { id: 'jaffna', name: 'Jaffna', type: 'district' as const, parentId: 'northern' },
    { id: 'kilinochchi', name: 'Kilinochchi', type: 'district' as const, parentId: 'northern' },
    { id: 'mannar', name: 'Mannar', type: 'district' as const, parentId: 'northern' },
    { id: 'mullaitivu', name: 'Mullaitivu', type: 'district' as const, parentId: 'northern' },
    { id: 'vavuniya', name: 'Vavuniya', type: 'district' as const, parentId: 'northern' },
    
    // Eastern Province
    { id: 'ampara', name: 'Ampara', type: 'district' as const, parentId: 'eastern' },
    { id: 'batticaloa', name: 'Batticaloa', type: 'district' as const, parentId: 'eastern' },
    { id: 'trincomalee', name: 'Trincomalee', type: 'district' as const, parentId: 'eastern' },
    
    // North Western Province
    { id: 'kurunegala', name: 'Kurunegala', type: 'district' as const, parentId: 'north-western' },
    { id: 'puttalam', name: 'Puttalam', type: 'district' as const, parentId: 'north-western' },
    
    // North Central Province
    { id: 'anuradhapura', name: 'Anuradhapura', type: 'district' as const, parentId: 'north-central' },
    { id: 'polonnaruwa', name: 'Polonnaruwa', type: 'district' as const, parentId: 'north-central' },
    
    // Uva Province
    { id: 'badulla', name: 'Badulla', type: 'district' as const, parentId: 'uva' },
    { id: 'moneragala', name: 'Moneragala', type: 'district' as const, parentId: 'uva' },
    
    // Sabaragamuwa Province
    { id: 'ratnapura', name: 'Ratnapura', type: 'district' as const, parentId: 'sabaragamuwa' },
    { id: 'kegalle', name: 'Kegalle', type: 'district' as const, parentId: 'sabaragamuwa' },
  ],
  CITIES: [
    // Colombo District
    { id: 'colombo-city', name: 'Colombo', type: 'city' as const, parentId: 'colombo' },
    { id: 'mount-lavinia', name: 'Mount Lavinia', type: 'city' as const, parentId: 'colombo' },
    { id: 'dehiwala', name: 'Dehiwala', type: 'city' as const, parentId: 'colombo' },
    { id: 'maharagama', name: 'Maharagama', type: 'city' as const, parentId: 'colombo' },
    { id: 'kotte', name: 'Kotte', type: 'city' as const, parentId: 'colombo' },
    { id: 'moratuwa', name: 'Moratuwa', type: 'city' as const, parentId: 'colombo' },
    { id: 'piliyandala', name: 'Piliyandala', type: 'city' as const, parentId: 'colombo' },
    { id: 'nugegoda', name: 'Nugegoda', type: 'city' as const, parentId: 'colombo' },
    { id: 'battaramulla', name: 'Battaramulla', type: 'city' as const, parentId: 'colombo' },
    { id: 'kotahena', name: 'Kotahena', type: 'city' as const, parentId: 'colombo' },
    
    // Gampaha District
    { id: 'gampaha-city', name: 'Gampaha', type: 'city' as const, parentId: 'gampaha' },
    { id: 'negombo', name: 'Negombo', type: 'city' as const, parentId: 'gampaha' },
    { id: 'ja-ela', name: 'Ja-Ela', type: 'city' as const, parentId: 'gampaha' },
    { id: 'kelaniya', name: 'Kelaniya', type: 'city' as const, parentId: 'gampaha' },
    { id: 'wattala', name: 'Wattala', type: 'city' as const, parentId: 'gampaha' },
    { id: 'hendala', name: 'Hendala', type: 'city' as const, parentId: 'gampaha' },
    { id: 'minuwangoda', name: 'Minuwangoda', type: 'city' as const, parentId: 'gampaha' },
    { id: 'ragama', name: 'Ragama', type: 'city' as const, parentId: 'gampaha' },
    
    // Kalutara District
    { id: 'kalutara-city', name: 'Kalutara', type: 'city' as const, parentId: 'kalutara' },
    { id: 'panadura', name: 'Panadura', type: 'city' as const, parentId: 'kalutara' },
    { id: 'horana', name: 'Horana', type: 'city' as const, parentId: 'kalutara' },
    { id: 'beruwala', name: 'Beruwala', type: 'city' as const, parentId: 'kalutara' },
    { id: 'matugama', name: 'Matugama', type: 'city' as const, parentId: 'kalutara' },
    
    // Kandy District
    { id: 'kandy-city', name: 'Kandy', type: 'city' as const, parentId: 'kandy' },
    { id: 'peradeniya', name: 'Peradeniya', type: 'city' as const, parentId: 'kandy' },
    { id: 'gampola', name: 'Gampola', type: 'city' as const, parentId: 'kandy' },
    { id: 'katugastota', name: 'Katugastota', type: 'city' as const, parentId: 'kandy' },
    { id: 'nawalapitiya', name: 'Nawalapitiya', type: 'city' as const, parentId: 'kandy' },
    
    // Matale District
    { id: 'matale-city', name: 'Matale', type: 'city' as const, parentId: 'matale' },
    { id: 'dambulla', name: 'Dambulla', type: 'city' as const, parentId: 'matale' },
    { id: 'sigiriya', name: 'Sigiriya', type: 'city' as const, parentId: 'matale' },
    
    // Nuwara Eliya District
    { id: 'nuwara-eliya-city', name: 'Nuwara Eliya', type: 'city' as const, parentId: 'nuwara-eliya' },
    { id: 'hatton', name: 'Hatton', type: 'city' as const, parentId: 'nuwara-eliya' },
    { id: 'talawakele', name: 'Talawakele', type: 'city' as const, parentId: 'nuwara-eliya' },
    
    // Galle District
    { id: 'galle-city', name: 'Galle', type: 'city' as const, parentId: 'galle' },
    { id: 'hikkaduwa', name: 'Hikkaduwa', type: 'city' as const, parentId: 'galle' },
    { id: 'bentota', name: 'Bentota', type: 'city' as const, parentId: 'galle' },
    { id: 'ambalangoda', name: 'Ambalangoda', type: 'city' as const, parentId: 'galle' },
    
    // Matara District
    { id: 'matara-city', name: 'Matara', type: 'city' as const, parentId: 'matara' },
    { id: 'weligama', name: 'Weligama', type: 'city' as const, parentId: 'matara' },
    { id: 'mirissa', name: 'Mirissa', type: 'city' as const, parentId: 'matara' },
    
    // Hambantota District
    { id: 'hambantota-city', name: 'Hambantota', type: 'city' as const, parentId: 'hambantota' },
    { id: 'tissamaharama', name: 'Tissamaharama', type: 'city' as const, parentId: 'hambantota' },
    { id: 'tangalle', name: 'Tangalle', type: 'city' as const, parentId: 'hambantota' },
    
    // Jaffna District
    { id: 'jaffna-city', name: 'Jaffna', type: 'city' as const, parentId: 'jaffna' },
    { id: 'chavakachcheri', name: 'Chavakachcheri', type: 'city' as const, parentId: 'jaffna' },
    { id: 'point-pedro', name: 'Point Pedro', type: 'city' as const, parentId: 'jaffna' },
    
    // Kurunegala District
    { id: 'kurunegala-city', name: 'Kurunegala', type: 'city' as const, parentId: 'kurunegala' },
    { id: 'kuliyapitiya', name: 'Kuliyapitiya', type: 'city' as const, parentId: 'kurunegala' },
    { id: 'polgahawela', name: 'Polgahawela', type: 'city' as const, parentId: 'kurunegala' },
    
    // Anuradhapura District
    { id: 'anuradhapura-city', name: 'Anuradhapura', type: 'city' as const, parentId: 'anuradhapura' },
    { id: 'kekirawa', name: 'Kekirawa', type: 'city' as const, parentId: 'anuradhapura' },
    
    // Batticaloa District
    { id: 'batticaloa-city', name: 'Batticaloa', type: 'city' as const, parentId: 'batticaloa' },
    { id: 'kalkudah', name: 'Kalkudah', type: 'city' as const, parentId: 'batticaloa' },
    
    // Trincomalee District
    { id: 'trincomalee-city', name: 'Trincomalee', type: 'city' as const, parentId: 'trincomalee' },
    { id: 'nilaveli', name: 'Nilaveli', type: 'city' as const, parentId: 'trincomalee' },
    
    // Badulla District
    { id: 'badulla-city', name: 'Badulla', type: 'city' as const, parentId: 'badulla' },
    { id: 'bandarawela', name: 'Bandarawela', type: 'city' as const, parentId: 'badulla' },
    { id: 'ella', name: 'Ella', type: 'city' as const, parentId: 'badulla' },
    
    // Ratnapura District
    { id: 'ratnapura-city', name: 'Ratnapura', type: 'city' as const, parentId: 'ratnapura' },
    { id: 'embilipitiya', name: 'Embilipitiya', type: 'city' as const, parentId: 'ratnapura' },
  ]
};

// Mock Workers Data - Sri Lankan Workers
export const MOCK_WORKERS = [
  {
    id: '1',
    name: 'Sunil Wickramasinghe',
    category: 'plumbing',
    rating: 4.8,
    reviewCount: 127,
    hourlyRate: 45,
    location: 'Colombo',
    detailedLocation: {
      province: 'Western Province',
      district: 'Colombo',
      city: 'Colombo',
      address: '123 Galle Road, Colombo 03'
    },
    distance: 2.3,
    skills: ['Emergency Repairs', 'Installation', 'Maintenance'],
    isAvailable: true,
    isVerified: true,
    completedJobs: 234,
    responseTime: '15 min',
    description: 'Professional plumber with 8+ years experience in residential and commercial plumbing.',
    phoneNumber: '+94 77 123 4567',
    email: 'sunil.wickramasinghe@email.com',
  },
  {
    id: '2', 
    name: 'Kamali Rajapakse',
    category: 'cleaning',
    rating: 4.9,
    reviewCount: 203,
    hourlyRate: 25,
    location: 'Mount Lavinia',
    detailedLocation: {
      province: 'Western Province',
      district: 'Colombo',
      city: 'Mount Lavinia',
      address: '45 Beach Road, Mount Lavinia'
    },
    distance: 1.8,
    skills: ['Deep Cleaning', 'Regular Maintenance', 'Eco-Friendly'],
    isAvailable: true,
    isVerified: true,
    completedJobs: 456,
    responseTime: '10 min',
    description: 'Reliable cleaning service with attention to detail and eco-friendly products.',
    phoneNumber: '+94 76 987 6543',
    email: 'kamali.rajapakse@email.com',
  },
  {
    id: '3',
    name: 'Lakshan Perera',
    category: 'electrical',
    rating: 4.7,
    reviewCount: 89,
    hourlyRate: 55,
    location: 'Negombo',
    detailedLocation: {
      province: 'Western Province',
      district: 'Gampaha',
      city: 'Negombo',
      address: '67 Church Street, Negombo'
    },
    distance: 3.1,
    skills: ['Wiring', 'Smart Home', 'Safety Inspection'],
    isAvailable: false,
    isVerified: true,
    completedJobs: 178,
    responseTime: '30 min',
    description: 'Licensed electrician specializing in modern solutions and smart home installations.',
    phoneNumber: '+94 75 555 1234',
    email: 'lakshan.perera@email.com',
  },
  {
    id: '4',
    name: 'Sanduni Silva',
    category: 'cleaning',
    rating: 4.6,
    reviewCount: 156,
    hourlyRate: 28,
    location: 'Dehiwala',
    detailedLocation: {
      province: 'Western Province',
      district: 'Colombo',
      city: 'Dehiwala',
      address: '89 Galle Road, Dehiwala'
    },
    distance: 2.8,
    skills: ['Office Cleaning', 'Carpet Cleaning', 'Window Cleaning'],
    isAvailable: true,
    isVerified: true,
    completedJobs: 298,
    responseTime: '20 min',
    description: 'Experienced in both residential and commercial cleaning services.',
    phoneNumber: '+94 71 456 7890',
    email: 'sanduni.silva@email.com',
  },
  {
    id: '5',
    name: 'Rohan Fernando',
    category: 'carpentry',
    rating: 4.8,
    reviewCount: 134,
    hourlyRate: 40,
    location: 'Maharagama',
    detailedLocation: {
      province: 'Western Province',
      district: 'Colombo',
      city: 'Maharagama',
      address: '23 High Level Road, Maharagama'
    },
    distance: 4.2,
    skills: ['Furniture Making', 'Kitchen Cabinets', 'Custom Woodwork'],
    isAvailable: true,
    isVerified: true,
    completedJobs: 187,
    responseTime: '25 min',
    description: 'Master carpenter with expertise in custom furniture and interior woodwork.',
    phoneNumber: '+94 78 234 5678',
    email: 'rohan.fernando@email.com',
  },
  {
    id: '6',
    name: 'Nilanthi Bandara',
    category: 'painting',
    rating: 4.7,
    reviewCount: 98,
    hourlyRate: 35,
    location: 'Kandy',
    detailedLocation: {
      province: 'Central Province',
      district: 'Kandy',
      city: 'Kandy',
      address: '12 Peradeniya Road, Kandy'
    },
    distance: 115.5,
    skills: ['Interior Painting', 'Exterior Painting', 'Decorative Finishes'],
    isAvailable: true,
    isVerified: true,
    completedJobs: 156,
    responseTime: '45 min',
    description: 'Professional painter specializing in residential and commercial projects.',
    phoneNumber: '+94 81 345 6789',
    email: 'nilanthi.bandara@email.com',
  },
  {
    id: '7',
    name: 'Mahinda Jayawardena',
    category: 'gardening',
    rating: 4.9,
    reviewCount: 176,
    hourlyRate: 22,
    location: 'Gampaha',
    detailedLocation: {
      province: 'Western Province',
      district: 'Gampaha',
      city: 'Gampaha',
      address: '56 Colombo Road, Gampaha'
    },
    distance: 25.3,
    skills: ['Landscaping', 'Tree Pruning', 'Garden Design'],
    isAvailable: true,
    isVerified: true,
    completedJobs: 287,
    responseTime: '35 min',
    description: 'Expert gardener with 12 years experience in landscaping and garden maintenance.',
    phoneNumber: '+94 33 567 8901',
    email: 'mahinda.jayawardena@email.com',
  },
  {
    id: '8',
    name: 'Nimal Perera',
    category: 'appliance',
    rating: 4.5,
    reviewCount: 67,
    hourlyRate: 48,
    location: 'Kotte',
    detailedLocation: {
      province: 'Western Province',
      district: 'Colombo',
      city: 'Kotte',
      address: '78 Parliament Road, Kotte'
    },
    distance: 8.7,
    skills: ['AC Repair', 'Refrigerator Service', 'Washing Machine Fix'],
    isAvailable: false,
    isVerified: true,
    completedJobs: 145,
    responseTime: '40 min',
    description: 'Certified appliance technician with expertise in all major brands.',
    phoneNumber: '+94 11 678 9012',
    email: 'nimal.perera@email.com',
  },
  {
    id: '9',
    name: 'Anura Kodithuwakku',
    category: 'electrical',
    rating: 4.6,
    reviewCount: 112,
    hourlyRate: 50,
    location: 'Galle',
    detailedLocation: {
      province: 'Southern Province',
      district: 'Galle',
      city: 'Galle',
      address: '34 Fort Road, Galle Fort'
    },
    distance: 120.4,
    skills: ['Solar Installation', 'Industrial Wiring', 'Power Systems'],
    isAvailable: true,
    isVerified: true,
    completedJobs: 203,
    responseTime: '1 hour',
    description: 'Specialized in renewable energy systems and industrial electrical work.',
    phoneNumber: '+94 91 234 5678',
    email: 'anura.kodithuwakku@email.com',
  },
  {
    id: '10',
    name: 'Prasad Gunasekara',
    category: 'carpentry',
    rating: 4.9,
    reviewCount: 87,
    hourlyRate: 38,
    location: 'Kurunegala',
    detailedLocation: {
      province: 'North Western Province',
      district: 'Kurunegala',
      city: 'Kurunegala',
      address: '67 Kandy Road, Kurunegala'
    },
    distance: 95.2,
    skills: ['Traditional Carpentry', 'Antique Restoration', 'Handcrafted Furniture'],
    isAvailable: true,
    isVerified: true,
    completedJobs: 124,
    responseTime: '50 min',
    description: 'Master craftsman specializing in traditional Sri Lankan woodwork and restoration.',
    phoneNumber: '+94 37 234 5678',
    email: 'prasad.gunasekara@email.com',
  },
  {
    id: '11',
    name: 'Chandrika Amarasinghe',
    category: 'cleaning',
    rating: 4.8,
    reviewCount: 145,
    hourlyRate: 30,
    location: 'Anuradhapura',
    detailedLocation: {
      province: 'North Central Province',
      district: 'Anuradhapura',
      city: 'Anuradhapura',
      address: '45 Sacred City Road, Anuradhapura'
    },
    distance: 205.7,
    skills: ['Heritage Site Cleaning', 'Temple Maintenance', 'Cultural Site Care'],
    isAvailable: true,
    isVerified: true,
    completedJobs: 167,
    responseTime: '2 hours',
    description: 'Specialized in cleaning and maintaining cultural heritage sites and temples.',
    phoneNumber: '+94 25 234 5678',
    email: 'chandrika.amarasinghe@email.com',
  },
  {
    id: '12',
    name: 'Sampath Wijesiri',
    category: 'gardening',
    rating: 4.7,
    reviewCount: 134,
    hourlyRate: 26,
    location: 'Nuwara Eliya',
    detailedLocation: {
      province: 'Central Province',
      district: 'Nuwara Eliya',
      city: 'Nuwara Eliya',
      address: '23 Hill Country Road, Nuwara Eliya'
    },
    distance: 178.3,
    skills: ['Tea Garden Maintenance', 'Hill Country Landscaping', 'Tropical Plants'],
    isAvailable: true,
    isVerified: true,
    completedJobs: 198,
    responseTime: '1.5 hours',
    description: 'Expert in hill country gardening with specialization in tea gardens and tropical plants.',
    phoneNumber: '+94 52 234 5678',
    email: 'sampath.wijesiri@email.com',
  },
  {
    id: '13',
    name: 'Ravi Mendis',
    category: 'painting',
    rating: 4.4,
    reviewCount: 78,
    hourlyRate: 32,
    location: 'Batticaloa',
    detailedLocation: {
      province: 'Eastern Province',
      district: 'Batticaloa',
      city: 'Batticaloa',
      address: '12 Coastal Road, Batticaloa'
    },
    distance: 298.6,
    skills: ['Marine Environment Painting', 'Weather Resistant Coatings', 'Coastal Property Care'],
    isAvailable: true,
    isVerified: false,
    completedJobs: 89,
    responseTime: '3 hours',
    description: 'Specialist in painting for coastal and marine environments with weather-resistant techniques.',
    phoneNumber: '+94 65 234 5678',
    email: 'ravi.mendis@email.com',
  },
  {
    id: '14',
    name: 'Kumari Jayasundara',
    category: 'appliance',
    rating: 4.6,
    reviewCount: 92,
    hourlyRate: 45,
    location: 'Matara',
    detailedLocation: {
      province: 'Southern Province',
      district: 'Matara',
      city: 'Matara',
      address: '56 Main Street, Matara'
    },
    distance: 145.8,
    skills: ['Home Appliances', 'Kitchen Equipment', 'Electronic Repairs'],
    isAvailable: true,
    isVerified: true,
    completedJobs: 156,
    responseTime: '1 hour',
    description: 'Certified technician for all types of home appliances and electronic equipment.',
    phoneNumber: '+94 41 234 5678',
    email: 'kumari.jayasundara@email.com',
  },
  {
    id: '15',
    name: 'Dilan Rathnayake',
    category: 'moving',
    rating: 4.8,
    reviewCount: 65,
    hourlyRate: 35,
    location: 'Panadura',
    detailedLocation: {
      province: 'Western Province',
      district: 'Kalutara',
      city: 'Panadura',
      address: '89 Galle Road, Panadura'
    },
    distance: 28.4,
    skills: ['House Moving', 'Office Relocation', 'Packing Services'],
    isAvailable: true,
    isVerified: true,
    completedJobs: 98,
    responseTime: '30 min',
    description: 'Professional moving service with careful handling and efficient packing.',
    phoneNumber: '+94 38 234 5678',
    email: 'dilan.rathnayake@email.com',
  }
];