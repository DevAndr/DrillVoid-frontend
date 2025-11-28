import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

import { ResponseServer } from "@/api/common/types.ts";
import { AuthResponse, SignInPayload } from "@/api/auth/types.ts";
import axiosInstance from "@/api/axios/instance.ts";
import { isDefined } from "@/utils";
import LocalStorageService from "@/utils/LocalStorageService.ts";
import { useUserDataState } from "@/store/auth/user.store.ts";

type Request = SignInPayload;

type Response = ResponseServer<AuthResponse>;

const signUp = async (request: Request) => {
  const url = "/auth/telegram";
  const { data } = await axiosInstance.post<Response>(url, request, {
    headers: {
      "is-first": "false",
    },
  });

  return data;
};

export const useAuth = () => {
  const { setUser } = useUserDataState();

  return useMutation<Response, AxiosError, Request>({
    mutationFn: signUp,
    onSuccess: (resp) => {
      setUser(resp.data.user);

      if (isDefined(resp.data.tokens)) {
        LocalStorageService.setValue(
          "accessToken",
          resp.data.tokens.accessToken,
        );
        LocalStorageService.setValue(
          "refreshToken",
          resp.data.tokens.refreshToken,
        );
      }
    },
  });
};
