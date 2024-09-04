import { getProfile } from "@/actions/getProfile";
import { ProfileState, useProfileStore } from "@/store/profileStore";
import { useMutation } from "@tanstack/react-query";

export const useGetProfile = () => {
  const { setProfile } = useProfileStore();
  return useMutation({
    mutationFn: () => getProfile(),
    onSuccess: (data) => {
      setProfile(data as ProfileState["user"]);
    },
  });
};
