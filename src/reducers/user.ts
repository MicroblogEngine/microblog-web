import { create, StateCreator } from "zustand";
import { cb, SignupForm, VerificationForm } from "@ararog/microblog-types";
import { createSelectors } from "@ararog/microblog-state";

import { api } from "@/helpers/api";
import { LoginResponse, User } from "@/models/user";

export interface UserState {
  user?: User;
  message?: string;
  loading: boolean;
  verifying: boolean;
  verify: (data: VerificationForm, verifySuccess: cb) => void;
  login: (username: string, password: string, loginSuccess: cb) => void;
  signup: (data: SignupForm, signupSuccess: cb) => void;
}

export const userStoreCreator: StateCreator<UserState> = (set) => ({
  user: undefined,
  loading: false,
  verifying: false,
  verify: async (data, verifySuccess) => {
    try {
      set({ verifying: true });
      const response = await api.post<User>("/auth/email/verify", data);
      if (response.ok) {
        set({
          user: response?.data,
          verifying: false,
        });
        verifySuccess();
      } else {
        set({ verifying: false });
      }
    } catch {
      set({ verifying: false });
    }
  },
  login: async (username, password, loginSuccess) => {
    try {
      set({ loading: true });
      const response = await api.post<LoginResponse>("/auth/login", {
        username,
        password,
      });
      if (response.ok && response.data) {
        localStorage.setItem("token", response.data.token);
        set({
          user: response.data.user,
          loading: false,
        });
        loginSuccess();
      } else {
        let message = "";
        if (response.status === 401) {
          message = "Invalid username or password";
        }
        set({ loading: false, message });
      }
    } catch (error) {
      console.log(error);
      set({ loading: false });
    }
  },
  signup: async (data, signupSuccess) => {
    try {
      set({ loading: true });
      const response = await api.post<User>("/auth/signup", data);
      if (response.ok) {
        set({
          user: response?.data,
          loading: false,
        });
        signupSuccess();
      } else {
        set({ loading: false });
      }
    } catch {
      set({ loading: false });
    }
  },
});

// define the store
export const useUserStore = createSelectors(create(userStoreCreator));
