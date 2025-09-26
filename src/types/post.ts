export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  authorId: string;
  imageUrl?: string;
  tags?: string[];
  category?: string;
  status: 'draft' | 'published' | 'archived';
  createdAt: string;
  updatedAt: string;
  likesCount?: number;
  commentsCount?: number;
}

export interface CreatePostRequest {
  title: string;
  content: string;
  imageUrl?: string;
  tags?: string[];
  category?: string;
  status?: 'draft' | 'published';
}

export interface CreatePostResponse {
  post: Post;
  message: string;
}

export interface UpdatePostRequest extends Partial<CreatePostRequest> {
  id: string;
}

export interface PostsListResponse {
  posts: Post[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  message?: string;
}

export interface PostState {
  posts: Post[];
  currentPost: Post | null;
  isLoading: boolean;
  isSubmitting: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  } | null;
}

export interface PostFormData {
  title: string;
  content: string;
  imageUrl: string;
  tags: string[];
  category: string;
  status: 'draft' | 'published';
}