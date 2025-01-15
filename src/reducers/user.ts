import { create, StateCreator } from 'zustand';
import { api } from '@/helpers/api';
import { User } from '@/models/user';

export interface UserState {
  user?: User
  loading: boolean
  login: (username: string, password: string) => void
}

export const userStoreCreator: StateCreator<UserState> = (set) => ({
  user: undefined,
  loading: false,
  login: async (username: string, password: string) => {
    set({ loading: true });
    const response = await api.post(`/users/login`, { username, password });
    set({ loading: false, user: response.data as User })
  }
});

// define the store
export const useFeedStore = create(userStoreCreator);