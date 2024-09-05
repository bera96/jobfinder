import { clearCookies } from "@/utils/clearCookie";
import { create } from "zustand";

export interface AuthState {
  user: {
    id: string;
    email: string;
    profileImage: string;
  } | null;
  modalStatuses: {
    login: boolean;
    register: boolean;
  };
  setUser: (user: { id: string; email: string; profileImage: string }) => void;
  setModalStatuses: (statuses: { login: boolean; register: boolean }) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  modalStatuses: {
    login: false,
    register: false,
  },
  setUser: (user) => {
    set({ user });
    localStorage.setItem("user", JSON.stringify(user));
  },
  setModalStatuses: (statuses: { login: boolean; register: boolean }) => {
    set((state) => ({
      modalStatuses: {
        ...state.modalStatuses,
        ...statuses,
      },
    }));
  },
  clearAuth: () => {
    set({ user: null });
    localStorage.clear();
    clearCookies();
  },
}));
