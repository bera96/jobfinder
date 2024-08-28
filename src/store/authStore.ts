import { create } from "zustand";

interface AuthState {
  user: { id: string; email: string; profileImage: string } | null;
  setUser: (user: { id: string; email: string; profileImage: string }) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => {
    set({ user });
  },
  clearAuth: () => {
    set({ user: null });
  },
}));
