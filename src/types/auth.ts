export interface User {
  id: string;
  mobile: string;
  name?: string;
  email?: string;
}

export interface LoginRequest {
  mobile: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  message: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}