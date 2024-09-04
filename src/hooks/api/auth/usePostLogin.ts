import { postLogin } from "@/actions/postLogin";
import { useAuthStore } from "@/store/authStore";
import { useMutation } from "@tanstack/react-query";
import { setCookie } from "cookies-next";
import { toast } from "react-toastify";

export const usePostLogin = (onSuccessCallback?: () => void) => {
  const setUser = useAuthStore((state) => state.setUser);
  return useMutation({
    mutationFn: (credentials) => postLogin(credentials as any),
    onSuccess: (data) => {
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      setCookie("accessToken", data.accessToken, { maxAge: 60 * 60 * 24 * 365 * 1 });
      setCookie("refreshToken", data.refreshToken, { maxAge: 60 * 60 * 24 * 365 * 1 });
      toast.success("Login successful.");
      if (onSuccessCallback) onSuccessCallback();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
