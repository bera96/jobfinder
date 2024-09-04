import { create } from "zustand";

interface LoadingState {
  jobsLoading: boolean;
  profileLoading: boolean;
  setJobsLoading: (loading: boolean) => void;
  setProfileLoading: (loading: boolean) => void;
}

export const useLoadingStore = create<LoadingState>((set) => ({
  jobsLoading: true,
  profileLoading: true,
  setJobsLoading: (loading) => set({ jobsLoading: loading }),
  setProfileLoading: (loading) => set({ profileLoading: loading }),
}));
