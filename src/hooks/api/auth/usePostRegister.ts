import { postRegister } from "@/actions/postRegister";
import { AuthState, useAuthStore } from "@/store/authStore";
import { useMutation } from "@tanstack/react-query";
import { setCookie } from "cookies-next";
import { toast } from "react-toastify";

export const usePostRegister = (onSuccessCallback?: () => void) => {
  const setUser = useAuthStore((state) => state.setUser);
  return useMutation({
    mutationFn: (credentials): any => postRegister(credentials as any),
    onSuccess: (data: AuthState) => {
      if (data.user !== null) {
        setUser(data.user);
      }
      localStorage.setItem("user", JSON.stringify(data.user));
      setCookie("accessToken", data.accessToken, { maxAge: 60 * 60 * 24 * 365 * 11 });
      setCookie("refreshToken", data.refreshToken, { maxAge: 60 * 60 * 24 * 365 * 10 });
      toast.success("Registration successfull.");
      if (onSuccessCallback) onSuccessCallback();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
