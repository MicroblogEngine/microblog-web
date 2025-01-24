import { create, StateCreator } from "zustand";
import { cb, CheckResetPasswordForm, ForgotPasswordForm, ResetPasswordForm, SignupForm, VerificationForm } from "@ararog/microblog-types";
import { createSelectors } from "@ararog/microblog-state";
import { persist } from 'zustand/middleware'

import { api } from "@/helpers/api";
import { LoginResponse, User } from "@/models/user";
import { merge } from "ts-deepmerge";

export interface UserState {
  user?: User;
  message?: string;
  loading: boolean;
  verifyingCode: boolean;
  sendingMail: boolean;
  resettingPassword: boolean;
  hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
  verifyCode: (data: VerificationForm, verifySuccess: cb) => void;
  login: (username: string, password: string, loginSuccess: cb) => void;
  signup: (data: SignupForm, signupSuccess: cb) => void;
  forgotPassword: (data: ForgotPasswordForm, forgotPasswordSuccess: cb) => void;
  checkResetPasswordToken: (data: CheckResetPasswordForm, checkResetPasswordTokenSuccess: cb) => void;
  resetPassword: (data: ResetPasswordForm, resetPasswordSuccess: cb) => void;
}

export const userStoreCreator: StateCreator<UserState> = (set, get) => ({
  user: undefined,
  loading: false,
  verifyingCode: false,
  sendingMail: false,
  resettingPassword: false,
  hasHydrated: false,
  setHasHydrated: (state) => {
    set({
      hasHydrated: state
    });
  },
  verifyCode: async (data, verifySuccess) => {
    try {
      set({ verifyingCode: true });
      
      data.userId = get().user!.id;
      
      const response = await api.post<VerificationForm>("/auth/email/verify", data);
      if (!response.ok) {
        const message = "Invalid code!";
        set({ verifyingCode: false, message });
        return;
      }

      set({
        verifyingCode: false,
      });
      verifySuccess();

    } catch {
      set({ verifyingCode: false });
    }
  },
  login: async (username, password, loginSuccess) => {
    try {
      set({ loading: true });
      const response = await api.post<LoginResponse>("/auth/login", {
        username,
        password,
      });

      if (response.status === 401) {
        const message = "Invalid username or password";
        set({ loading: false, message });
        return;
      }

      if (response.ok && response.data) {
        localStorage.setItem("token", response.data.token);
        set({
          user: response.data.user,
          loading: false,
        });
        loginSuccess();
      }
    } catch {
      set({ loading: false });
    }
  },
  signup: async (data, signupSuccess) => {
    try {
      set({ loading: true });
      const response = await api.post<User>("/auth/signup", data);
      if (!response.ok) {
        set({ loading: false });
        return;
      }
      set({
        user: response?.data,
        loading: false,
      });
      signupSuccess();
    } catch {
      set({ loading: false });
    }
  },
  forgotPassword: async (data, forgotPasswordSuccess) => {
    try {
      set({ sendingMail: true });
      const response = await api.post<ForgotPasswordForm>("/auth/password/forgot", data);
      if (!response.ok) {
        set({ sendingMail: false });
        return;
      }

      forgotPasswordSuccess();
    } catch {
      set({ sendingMail: false });
    }
  },
  checkResetPasswordToken: async (data, checkResetPasswordTokenSuccess) => {
    try {
      set({ resettingPassword: true });
      const response = await api.post<ResetPasswordForm>("/auth/password/reset/check-token", data);
      if (!response.ok) {
        set({ resettingPassword: false });
        return;
      }
      checkResetPasswordTokenSuccess();
    } catch {
      set({ resettingPassword: false });
    }
  },
  resetPassword: async (data, resetPasswordSuccess) => {
    try {
      set({ resettingPassword: true });
      const response = await api.post<ResetPasswordForm>("/auth/password/reset", data);
      if (!response.ok) {
        set({ resettingPassword: false });
        return;
      }
      resetPasswordSuccess();
    } catch {
      set({ resettingPassword: false });
    }
  },
});

// define the store
export const useUserStore = createSelectors(create(persist(userStoreCreator, {
  name: 'microblog-user',
  merge: (persistedState: unknown, currentState: UserState) => merge(currentState, persistedState as UserState),
  onRehydrateStorage: (state) => {
    return () => state.setHasHydrated(true)
  }
})));
