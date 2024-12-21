import { create } from 'zustand';
import { api } from '@/helpers/api';
import { Post } from '@/models/feed';

export interface FeedState {
  postId: number | null
  feed?: Post[]
  post?: Post
  isLoading: boolean
  loadFeed: () => void
  loadPost: (postId?: string) => void
}

// define the store
export const useStore = create<FeedState>((set) => ({
  postId: null,
  posts: [],
  post: undefined,
  isLoading: false,
  loadFeed: async () => {
    set({ isLoading: true });
    const response = await api.get('/feed');
    set({ isLoading: false, feed: response.data as Post[] });
  },
  loadPost: async (postId?: string) => {
    set({ isLoading: true });
    const response = await api.get(`/feed/${postId}`);
    set({ isLoading: false, post: response.data as Post })
  }
}));