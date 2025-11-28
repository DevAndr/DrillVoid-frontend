import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { useUserDataState } from "@/store/auth/user.store.ts";
import axiosInstance from "@/api/axios/instance.ts";
import { ResponseServer } from "@/api/common/types.ts";
import { User } from "@/api/user/types.ts";

type Response = ResponseServer<User>;

const getCurrentUser = async () => {
  const url = "/auth/me";
  const { data } = await axiosInstance.get<Response>(url);

  return data.data;
};

export const useCurrentUser = () => {
  const { setUser } = useUserDataState();

  return useMutation<Response["data"], AxiosError>({
    mutationFn: getCurrentUser,
    mutationKey: ["currentUser"],
    onSuccess: (data) => {
      setUser(data);
    },
  });
};
