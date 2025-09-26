import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import postService from '../../services/postService';
import { 
  PostState, 
  Post, 
  CreatePostRequest, 
  CreatePostResponse,
  UpdatePostRequest,
  PostsListResponse
} from '../../types/post';
import { MESSAGES } from '../../utils/constants';

// Async thunk for creating a post
export const createPost = createAsyncThunk<
  CreatePostResponse,
  CreatePostRequest,
  { rejectValue: string }
>('post/createPost', async (postData, { rejectWithValue }) => {
  try {
    const result = await postService.createPost(postData);
    return result;
  } catch (error: any) {
    return rejectWithValue(error.message || MESSAGES.ERROR.GENERIC);
  }
});

// Async thunk for fetching posts
export const fetchPosts = createAsyncThunk<
  PostsListResponse,
  { page?: number; limit?: number; category?: string } | undefined,
  { rejectValue: string }
>('post/fetchPosts', async (params = {}, { rejectWithValue }) => {
  try {
    const result = await postService.getPosts(params);
    return result;
  } catch (error: any) {
    return rejectWithValue(error.message || MESSAGES.ERROR.GENERIC);
  }
});

// Async thunk for fetching user's posts
export const fetchUserPosts = createAsyncThunk<
  PostsListResponse,
  { page?: number; limit?: number; status?: 'draft' | 'published' | 'archived' } | undefined,
  { rejectValue: string }
>('post/fetchUserPosts', async (params = {}, { rejectWithValue }) => {
  try {
    const result = await postService.getUserPosts(params);
    return result;
  } catch (error: any) {
    return rejectWithValue(error.message || MESSAGES.ERROR.GENERIC);
  }
});

// Async thunk for fetching a single post
export const fetchPostById = createAsyncThunk<
  Post,
  string,
  { rejectValue: string }
>('post/fetchPostById', async (postId, { rejectWithValue }) => {
  try {
    const result = await postService.getPostById(postId);
    return result;
  } catch (error: any) {
    return rejectWithValue(error.message || MESSAGES.ERROR.GENERIC);
  }
});

// Async thunk for updating a post
export const updatePost = createAsyncThunk<
  CreatePostResponse,
  UpdatePostRequest,
  { rejectValue: string }
>('post/updatePost', async (postData, { rejectWithValue }) => {
  try {
    const result = await postService.updatePost(postData);
    return result;
  } catch (error: any) {
    return rejectWithValue(error.message || MESSAGES.ERROR.GENERIC);
  }
});

// Async thunk for deleting a post
export const deletePost = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>('post/deletePost', async (postId, { rejectWithValue }) => {
  try {
    await postService.deletePost(postId);
    return postId;
  } catch (error: any) {
    return rejectWithValue(error.message || MESSAGES.ERROR.GENERIC);
  }
});

const initialState: PostState = {
  posts: [],
  currentPost: null,
  isLoading: false,
  isSubmitting: false,
  error: null,
  pagination: null,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    clearPostError: (state) => {
      state.error = null;
    },
    clearCurrentPost: (state) => {
      state.currentPost = null;
    },
    setCurrentPost: (state, action: PayloadAction<Post>) => {
      state.currentPost = action.payload;
    },
    clearPosts: (state) => {
      state.posts = [];
      state.pagination = null;
    },
    resetPostState: (state) => {
      state.posts = [];
      state.currentPost = null;
      state.error = null;
      state.pagination = null;
      state.isLoading = false;
      state.isSubmitting = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create post cases
      .addCase(createPost.pending, (state) => {
        state.isSubmitting = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action: PayloadAction<CreatePostResponse>) => {
        state.isSubmitting = false;
        state.posts.unshift(action.payload.post); // Add new post to the beginning
        state.error = null;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isSubmitting = false;
        state.error = action.payload || 'Failed to create post';
      })
      // Fetch posts cases
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<PostsListResponse>) => {
        state.isLoading = false;
        state.posts = action.payload.posts;
        state.pagination = action.payload.pagination;
        state.error = null;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to fetch posts';
      })
      // Fetch user posts cases
      .addCase(fetchUserPosts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserPosts.fulfilled, (state, action: PayloadAction<PostsListResponse>) => {
        state.isLoading = false;
        state.posts = action.payload.posts;
        state.pagination = action.payload.pagination;
        state.error = null;
      })
      .addCase(fetchUserPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to fetch user posts';
      })
      // Fetch single post cases
      .addCase(fetchPostById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPostById.fulfilled, (state, action: PayloadAction<Post>) => {
        state.isLoading = false;
        state.currentPost = action.payload;
        state.error = null;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to fetch post';
      })
      // Update post cases
      .addCase(updatePost.pending, (state) => {
        state.isSubmitting = true;
        state.error = null;
      })
      .addCase(updatePost.fulfilled, (state, action: PayloadAction<CreatePostResponse>) => {
        state.isSubmitting = false;
        const updatedPost = action.payload.post;
        const index = state.posts.findIndex(post => post.id === updatedPost.id);
        if (index !== -1) {
          state.posts[index] = updatedPost;
        }
        if (state.currentPost?.id === updatedPost.id) {
          state.currentPost = updatedPost;
        }
        state.error = null;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.isSubmitting = false;
        state.error = action.payload || 'Failed to update post';
      })
      // Delete post cases
      .addCase(deletePost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.posts = state.posts.filter(post => post.id !== action.payload);
        if (state.currentPost?.id === action.payload) {
          state.currentPost = null;
        }
        state.error = null;
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to delete post';
      });
  },
});

export const { 
  clearPostError, 
  clearCurrentPost, 
  setCurrentPost, 
  clearPosts, 
  resetPostState 
} = postSlice.actions;

export default postSlice.reducer;