import { create, StateCreator } from "zustand";
import { 
  ApiError, 
  UserApiError,
  Callback,
  MessageCallback,
  ForgotPasswordForm, 
  ResetPasswordForm, 
  SignupDetailsForm, 
  SignupUserForm, 
  VerificationForm 
} from "@ararog/microblog-types";
import { ErrorMessages } from "@ararog/microblog-server";
import { createSelectors } from "@ararog/microblog-state";
import { persist } from 'zustand/middleware'

import { api } from "@/helpers/api";
import { LoginResponse } from "@/models/auth";
import { User } from "@/models/user";
import { merge } from "ts-deepmerge";
import { Profile } from "@/models/profile";
export interface UserState {
  user?: User;
  profile?: Profile;
  isLoggedIn: boolean;
  errors?: UserApiError["errors"];
  loading: boolean;
  signupDetails?: SignupDetailsForm;
  verifyingCode: boolean;
  sendingMail: boolean;
  resettingPassword: boolean;
  hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
  verifyCode: (data: VerificationForm, verifySuccess: Callback) => void;
  login: (username: string, password: string, loginSuccess: Callback, loginFailed: MessageCallback) => void;
  logout: (logoutSuccess: Callback) => void;
  updateSignupDetails: (data: SignupDetailsForm, updateSignupDetailsSuccess: Callback) => void;
  completeSignup: (data: SignupUserForm, completeSignupSuccess: Callback) => void;
  forgotPassword: (data: ForgotPasswordForm, forgotPasswordSuccess: Callback) => void;
  resetPassword: (data: ResetPasswordForm, resetPasswordSuccess: Callback) => void;
}

export const userStoreCreator: StateCreator<UserState> = (set, get) => ({
  user: undefined,
  profile: undefined,
  isLoggedIn: false,
  errors: undefined,
  loading: false,
  signupDetails: undefined,
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
      
      const response = await api.post<VerificationForm, ApiError>("/auth/email/verify", data);
      if (!response.ok) {
        set({ verifyingCode: false, errors: response?.data?.errors });
        return;
      }

      set({
        verifyingCode: false,
      });
      verifySuccess();

    } finally {
      set({ verifyingCode: false });
    }
  },
  login: async (username, password, loginSuccess, loginFailed) => {
    try {
      set({ loading: true, errors: undefined });
      const response = await api.post<LoginResponse, UserApiError>("/auth/login", {
        username,
        password,
      });

      if (!response.ok) {
        if(response?.data?.errors?.user?.includes(ErrorMessages.user.emailNotVerified)) {
          set({
            loading: false,
            user: response?.data?.user,
          });
          loginFailed(ErrorMessages.user.emailNotVerified);
          return;
        }

        set({ loading: false, errors: response?.data?.errors });
        return;
      }

      if (response.ok && response.data) {
        localStorage.setItem("token", response.data.token);
        set({
          user: response.data.user,
          profile: response.data.profile,
          isLoggedIn: true,
          loading: false,
        });
        loginSuccess();
      }
    } finally {
      set({ loading: false });
    }
  },
  logout: (logoutSuccess) => {
    localStorage.removeItem("token");
    set({
      user: undefined,
      profile: undefined,
      isLoggedIn: false,
      loading: false,
      resettingPassword: false,
      sendingMail: false,
      verifyingCode: false,
    });
    logoutSuccess();
  },
  updateSignupDetails: async (data, updateSignupDetailsSuccess) => {
    set({ signupDetails: { ...data} });
    updateSignupDetailsSuccess();
  },
  completeSignup: async (data, completeSignupSuccess) => {
    try {
      set({ loading: true });
      const response = await api.post<User, ApiError>("/auth/signup", {
        ...get().signupDetails,
        ...data,
      });
      if (!response.ok) {
        set({ loading: false, errors: response?.data?.errors });
        return;
      }
      set({
        user: response?.data,
        loading: false,
      });
      completeSignupSuccess();
    } finally {
      set({ loading: false });
    }
  },
  forgotPassword: async (data, forgotPasswordSuccess) => {
    try {
      set({ sendingMail: true });
      const response = await api.post<ForgotPasswordForm, ApiError>("/auth/password/forgot", data);
      if (!response.ok) {
        set({ sendingMail: false, errors: response?.data?.errors });
        return;
      }

      forgotPasswordSuccess();
    } finally {
      set({ sendingMail: false });
    }
  },
  resetPassword: async (data, resetPasswordSuccess) => {
    try {
      set({ resettingPassword: true });
      const response = await api.post<ResetPasswordForm, ApiError>("/auth/password/reset", data);
      if (!response.ok) {
        set({ resettingPassword: false, errors: response?.data?.errors });
        return;
      }
      resetPasswordSuccess();
    } finally {
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
