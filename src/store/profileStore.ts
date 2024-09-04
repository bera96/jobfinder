import { create } from "zustand";

export interface ProfileState {
  user: {
    id: string;
    email: string;
    profileImage: string;
    appliedJobs: string[];
  } | null;
  setProfile: (profile: ProfileState["user"]) => void;
  addAppliedJob: (jobId: string) => void;
  removeFromAppliedJob: (jobId: string) => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  user: null,
  setProfile: (user) => {
    set({ user });
  },
  addAppliedJob: (jobId: string) =>
    set((state) => {
      if (state.user) {
        return {
          user: {
            ...state.user,
            appliedJobs: [...state.user.appliedJobs, jobId],
          },
        };
      }
      return state;
    }),
  removeFromAppliedJob: (jobId: string) =>
    set((state) => {
      if (state.user) {
        return {
          user: {
            ...state.user,
            appliedJobs: state.user.appliedJobs.filter((id) => id !== jobId),
          },
        };
      }
      return state;
    }),
}));
