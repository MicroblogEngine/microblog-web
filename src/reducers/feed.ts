import { create, StateCreator } from 'zustand';
import { api } from '@/helpers/api';
import { Post } from '@/models/feed';

export interface FeedState {
  postId: number | null
  feed?: Post[]
  post?: Post
  loading: boolean
  loadFeed: () => void
  loadPost: (postId?: string) => void
}

export const feedStoreCreator: StateCreator<FeedState> = (set) => ({
  postId: null,
  feed: [],
  post: undefined,
  loading: false,
  loadFeed: async () => {
    set({ loading: true });
    const response = await api.get('/feed');
    set({ loading: false, feed: response.data as Post[] });
  },
  loadPost: async (postId?: string) => {
    set({ loading: true });
    const response = await api.get(`/feed/${postId}`);
    set({ loading: false, post: response.data as Post })
  }
});

// define the store
export const useFeedStore = create(feedStoreCreator);