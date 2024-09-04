import { clearCookies } from "@/utils/clearCookie";
import { create } from "zustand";

export interface AuthState {
  user: {
    id: string;
    email: string;
    profileImage: string;
  } | null;
  setUser: (user: { id: string; email: string; profileImage: string }) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => {
    set({ user });
    localStorage.setItem("user", JSON.stringify(user));
  },
  clearAuth: () => {
    set({ user: null });
    localStorage.clear();
    clearCookies();
  },
}));
