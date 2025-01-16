import { create, StateCreator } from 'zustand';
import { api } from '@/helpers/api';
import { LoginResponse, User } from '@/models/user';
import { SignupForm } from '@/types/form';
import { Callback } from '@/types/functions';

export interface UserState {
  user?: User
  loading: boolean
  message?: string
  login: (username: string, password: string, loginSuccess: Callback) => void;
  signup: (data: SignupForm, signupSuccess: Callback) => void;
}

export const userStoreCreator: StateCreator<UserState> = (set) => ({
  user: undefined,
  loading: false,
  login: async (username, password, loginSuccess) => {
    try {
      set({loading: true});
      const response = await api.post<LoginResponse>('/auth/login', {
        username,
        password,
      });
      if (response.ok && response.data) {
        localStorage.setItem('token', response.data.token);
        set({
          user: response.data.user,
          loading: false,
        });
        loginSuccess();
      } else {
        let message = '';
        if (response.status === 401) {
          message = 'Invalid username or password';
        }
        set({loading: false, message});
      }
    } catch (error) {
      console.log(error);
      set({loading: false});
    }
  },
  signup: async (data, signupSuccess) => {
    try {
      set({loading: true});
      const response = await api.post<User>('/auth/signup', data);
      if (response.ok) {
        set({
          user: response?.data,
          loading: false,
        });
        signupSuccess();
      } else {
        set({loading: false});
      }
    } catch {
      set({loading: false});
    }
  },
});

// define the store
export const useUserStore = create(userStoreCreator);