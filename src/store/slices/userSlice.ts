import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import authService from '../../services/authService';
import { UserState, UserProfile, UserProfileResponse } from '../../types/user';
import { MESSAGES } from '../../utils/constants';

// Async thunk for fetching user profile
export const fetchUserProfile = createAsyncThunk<
  UserProfileResponse,
  void,
  { rejectValue: string }
>('user/fetchUserProfile', async (_, { rejectWithValue }) => {
  try {
    const result = await authService.getUserProfile();
    return result;
  } catch (error: any) {
    return rejectWithValue(error.message || MESSAGES.ERROR.GENERIC);
  }
});

// Async thunk for updating user profile (for future use)
export const updateUserProfile = createAsyncThunk<
  UserProfileResponse,
  Partial<UserProfile>,
  { rejectValue: string }
>('user/updateUserProfile', async (profileData, { rejectWithValue }) => {
  try {
    const result = await authService.updateUserProfile(profileData);
    return result;
  } catch (error: any) {
    return rejectWithValue(error.message || MESSAGES.ERROR.GENERIC);
  }
});

const initialState: UserState = {
  profile: null,
  isLoading: false,
  error: null,
  lastFetched: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUserError: (state) => {
      state.error = null;
    },
    clearUserProfile: (state) => {
      state.profile = null;
      state.error = null;
      state.lastFetched = null;
    },
    setUserProfile: (state, action: PayloadAction<UserProfile>) => {
      state.profile = action.payload;
      state.lastFetched = Date.now();
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch user profile cases
      .addCase(fetchUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action: PayloadAction<UserProfileResponse>) => {
        state.isLoading = false;
        state.profile = action.payload.user;
        state.error = null;
        state.lastFetched = Date.now();
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to fetch user profile';
      })
      // Update user profile cases
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action: PayloadAction<UserProfileResponse>) => {
        state.isLoading = false;
        state.profile = action.payload.user;
        state.error = null;
        state.lastFetched = Date.now();
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to update user profile';
      });
  },
});

export const { clearUserError, clearUserProfile, setUserProfile } = userSlice.actions;
export default userSlice.reducer;