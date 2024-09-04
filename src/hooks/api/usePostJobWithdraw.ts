import { postJobWithdraw } from "@/actions/postJobWithdraw";
import { useMutation } from "@tanstack/react-query";

export const usePostJobWithdraw = () => {
  return useMutation({
    mutationFn: (id: string) => postJobWithdraw(id),
  });
};
