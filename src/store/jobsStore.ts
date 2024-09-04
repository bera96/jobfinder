import { create } from "zustand";

export interface JobData {
  companyName: string;
  keywords: string[];
  id: string;
  description: string;
  name: string;
  createdAt: string;
  location: string;
  salary: number;
}

export interface JobsState {
  allJobs: {
    meta: { total: number; page: number; perPage: number };
    data: JobData[];
  } | null;
  hasAllJobs: boolean;
  jobs: {
    meta: { total: number; page: number; perPage: number };
    data: JobData[];
  } | null;
  job: JobData | null;
  setAllJobs: (jobs: JobsState["jobs"]) => void;
  setJobs: (jobs: JobsState["jobs"]) => void;
  setJob: (job: JobData) => void;
  setHasAllJobs: () => void;
}

export const useJobsStore = create<JobsState>((set) => ({
  allJobs: null,
  hasAllJobs: false,
  job: null,
  jobs: null,
  setJobs: (jobs) => {
    set({ jobs });
  },
  setJob: (job) => {
    set({ job });
  },
  setAllJobs: (allJobs) => {
    set({ allJobs });
  },
  setHasAllJobs: () => {
    set({ hasAllJobs: true });
  },
}));
