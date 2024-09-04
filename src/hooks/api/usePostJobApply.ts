import { postJob } from "@/actions/postJobApply";
import { useMutation } from "@tanstack/react-query";

export const usePostJobApply = () => {
  return useMutation({
    mutationFn: (id: string) => postJob(id),
  });
};
