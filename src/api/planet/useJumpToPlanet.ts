import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import axiosInstance from "@/api/axios/instance.ts";
import { ResponseServer } from "@/api/common/types.ts";
import { JumpResponseData } from "@/api/planet/types.ts";

type Request = {};

type Response = ResponseServer<JumpResponseData>;

const jumpToPlanet = async (req: Request) => {
  const url = "/planet/jump_to_planet";

  const { data } = await axiosInstance.post<Response>(url, req);

  return data.data;
};

export const useJumpToPlanet = () => {
  return useMutation<JumpResponseData, AxiosError, Request>({
    mutationFn: jumpToPlanet,
    mutationKey: ["jumpToPlanet"],
  });
};
