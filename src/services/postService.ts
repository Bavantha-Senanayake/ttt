import api from './api';
import { API_CONFIG, MESSAGES } from '../utils/constants';
import { 
  CreatePostRequest, 
  CreatePostResponse, 
  UpdatePostRequest, 
  Post,
  PostsListResponse 
} from '../types/post';

interface PostQueryParams {
  page?: number;
  limit?: number;
  category?: string;
  status?: 'draft' | 'published' | 'archived';
  search?: string;
}

class PostService {
  // Create a new post
  async createPost(postData: CreatePostRequest): Promise<CreatePostResponse> {
    try {
      const response = await api.post<CreatePostResponse>(API_CONFIG.ENDPOINTS.POST_ADD, postData);
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to create post';
      throw new Error(message);
    }
  }

  // Get all posts with optional filters
  async getPosts(params: PostQueryParams = {}): Promise<PostsListResponse> {
    try {
      const queryParams = new URLSearchParams();
      
      if (params.page) queryParams.append('page', params.page.toString());
      if (params.limit) queryParams.append('limit', params.limit.toString());
      if (params.category) queryParams.append('category', params.category);
      if (params.status) queryParams.append('status', params.status);
      if (params.search) queryParams.append('search', params.search);

      const url = `${API_CONFIG.ENDPOINTS.POSTS}?${queryParams.toString()}`;
      const response = await api.get<PostsListResponse>(url);
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to fetch posts';
      throw new Error(message);
    }
  }

  // Get a single post by ID
  async getPostById(postId: string): Promise<Post> {
    try {
      const url = API_CONFIG.ENDPOINTS.POST_DETAIL.replace(':id', postId);
      const response = await api.get<{ post: Post }>(url);
      return response.data.post;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to fetch post';
      throw new Error(message);
    }
  }

  // Update an existing post
  async updatePost(postData: UpdatePostRequest): Promise<CreatePostResponse> {
    try {
      const { id, ...updateData } = postData;
      const url = API_CONFIG.ENDPOINTS.POST_UPDATE.replace(':id', id);
      const response = await api.put<CreatePostResponse>(url, updateData);
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to update post';
      throw new Error(message);
    }
  }

  // Delete a post
  async deletePost(postId: string): Promise<{ message: string }> {
    try {
      const url = API_CONFIG.ENDPOINTS.POST_DELETE.replace(':id', postId);
      const response = await api.delete<{ message: string }>(url);
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to delete post';
      throw new Error(message);
    }
  }

  // Get current user's posts
  async getUserPosts(params: PostQueryParams = {}): Promise<PostsListResponse> {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('author', 'me'); // Filter by current user
      
      if (params.page) queryParams.append('page', params.page.toString());
      if (params.limit) queryParams.append('limit', params.limit.toString());
      if (params.status) queryParams.append('status', params.status);

      const url = `${API_CONFIG.ENDPOINTS.POSTS}?${queryParams.toString()}`;
      const response = await api.get<PostsListResponse>(url);
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to fetch user posts';
      throw new Error(message);
    }
  }

  // Upload image for post (if your API supports it)
  async uploadPostImage(imageFile: FormData): Promise<{ imageUrl: string }> {
    try {
      const response = await api.post<{ imageUrl: string }>('/upload/post-image', imageFile, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to upload image';
      throw new Error(message);
    }
  }
}

// Export singleton instance
export default new PostService();