import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { ResponseServer } from "@/api/common/types.ts";
import axiosInstance from "@/api/axios/instance.ts";
import { MiningResponse } from "@/api/ship/types.ts";

type Request = {};

type Response = ResponseServer<MiningResponse>;

const getMiningProgress = async () => {
  const url = `/ship/progress`;

  const { data } = await axiosInstance.get<Response>(url);

  return data.data;
};

export const useGetMiningProgress = () => {
  return useQuery<MiningResponse, AxiosError>({
    queryKey: ["miningProgress"],
    queryFn: getMiningProgress,
  });
};

export const useGetMiningProgressMutation = () => {
  return useMutation<MiningResponse, AxiosError, Request>({
    mutationKey: ["miningProgress"],
    mutationFn: getMiningProgress,
  });
};
