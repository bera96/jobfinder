import { getJob } from "@/actions/getJob";
import { JobData, useJobsStore } from "@/store/jobsStore";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useGetJob = () => {
  const { setJob } = useJobsStore();
  return useMutation({
    mutationFn: (id: string) => getJob(id),
    onSuccess: (data) => {
      setJob(data as JobData);
    },
    onError: (error) => {
      toast.error(error.message)
    },
  });
};
