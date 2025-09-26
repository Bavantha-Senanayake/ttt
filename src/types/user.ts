export interface UserProfile {
  id: string;
  mobile: string;
  username: string;
  name?: string;
  email?: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserProfileResponse {
  user: UserProfile;
  message?: string;
}

export interface UserState {
  profile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  lastFetched: number | null;
}