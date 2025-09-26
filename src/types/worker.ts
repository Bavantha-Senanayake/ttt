export interface Worker {
  id: string;
  name: string;
  profileImage?: string;
  category: string;
  rating: number;
  reviewCount: number;
  hourlyRate: number;
  location: string;
  distance?: number;
  skills: string[];
  isAvailable: boolean;
  isVerified: boolean;
  completedJobs: number;
  responseTime: string;
  description?: string;
}

export interface JobCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  workerCount: number;
  averageRate: number;
}

export interface JobPost {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  budget: {
    min: number;
    max: number;
    type: 'hourly' | 'fixed';
  };
  customerId: string;
  customerName: string;
  postedDate: string;
  deadline?: string;
  skillsRequired: string[];
  applicantCount: number;
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
}

export interface HireRequest {
  workerId: string;
  customerId: string;
  category: string;
  description: string;
  location: string;
  urgency: 'immediate' | 'today' | 'this_week' | 'flexible';
  budget?: {
    amount: number;
    type: 'hourly' | 'fixed';
  };
}

export interface WorkerState {
  workers: Worker[];
  categories: JobCategory[];
  jobPosts: JobPost[];
  nearbyWorkers: Worker[];
  featuredWorkers: Worker[];
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  selectedCategory: string | null;
  filters: {
    minRating: number;
    maxRate: number;
    distance: number;
    availability: boolean;
    verified: boolean;
  };
}