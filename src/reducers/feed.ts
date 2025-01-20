import { create, StateCreator } from "zustand";
import { cb } from "@ararog/microblog-types";
import { createSelectors } from "@ararog/microblog-state";

import { api } from "@/helpers/api";
import { Post } from "@/models/feed";

export interface FeedState {
  postId: number | null;
  feed?: Post[];
  post?: Post;
  loading: boolean;
  loadFeed: cb;
  loadPost: (postId?: string) => void;
}

export const feedStoreCreator: StateCreator<FeedState> = (set) => ({
  postId: null,
  feed: [],
  post: undefined,
  loading: false,
  loadFeed: async () => {
    set({ loading: true });
    const response = await api.get<Post[]>("/feed");
    if (response.ok) {
      set({ loading: false, feed: response.data });
    } else {
      set({ loading: false });
    }
  },
  loadPost: async (postId?: string) => {
    set({ loading: true });
    const response = await api.get<Post>(`/feed/${postId}`);
    if (response.ok) {
      set({ loading: false, post: response.data });
    } else {
      set({ loading: false });
    }
  },
});

// define the store
export const useFeedStore = createSelectors(create(feedStoreCreator));
