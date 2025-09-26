import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import authService from '../../services/authService';
import { AuthState, LoginRequest, LoginResponse, User } from '../../types/auth';
import { MESSAGES } from '../../utils/constants';

// Async thunk for login
export const loginUser = createAsyncThunk<
  LoginResponse,
  LoginRequest,
  { rejectValue: string }
>('auth/loginUser', async ({ mobile, password }, { rejectWithValue }) => {
  try {
    console.log('result2');
    const result = await authService.login(mobile, password);
    console.log(result);
    return result;
  } catch (error: any) {
    console.error('Login error in thunk:', error);
    return rejectWithValue(error.message || MESSAGES.ERROR.LOGIN_FAILED);
  }
});

// Async thunk for logout
export const logoutUser = createAsyncThunk('auth/logoutUser', async (_, { dispatch }) => {
  try {
    await authService.logout();
    // Also clear user profile from user slice
    dispatch({ type: 'user/clearUserProfile' });
  } catch (error: any) {
    console.error('Logout error:', error);
  }
});

// Async thunk for checking stored auth
export const checkStoredAuth = createAsyncThunk<
  { user: User; token: string } | null
>('auth/checkStoredAuth', async () => {
  try {
    const result = await authService.checkStoredAuth();
    return result;
  } catch (error) {
    return null;
  }
});

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetAuth: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Login failed';
        state.isAuthenticated = false;
      })
      // Logout cases
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      // Check stored auth cases
      .addCase(checkStoredAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkStoredAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.isAuthenticated = true;
        }
      })
      .addCase(checkStoredAuth.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { clearError, resetAuth } = authSlice.actions;
export default authSlice.reducer;