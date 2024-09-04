import { getJobs } from "@/actions/getJobs";
import { JobsState, useJobsStore } from "@/store/jobsStore";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useGetJobs = () => {
  const { setJobs, setAllJobs, setHasAllJobs, hasAllJobs } = useJobsStore();
  return useMutation({
    mutationFn: (queryParams) => getJobs(queryParams as any),
    onSuccess: (data) => {
      setJobs(data as JobsState["jobs"]);
      if (!hasAllJobs) {
        setAllJobs(data as JobsState["jobs"]);
      }
      setHasAllJobs();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
