import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { TotalMiningPlanet } from "@/api/planet/types.ts";
import { ResponseServer } from "@/api/common/types.ts";
import axiosInstance from "@/api/axios/instance.ts";

type Request = {
  uid: string;
};

type Response = ResponseServer<TotalMiningPlanet>;

const getMiningProgress = async ({ uid }: Request) => {
  const url = `/ship/progress/${uid}`;

  const { data } = await axiosInstance.get<Response>(url);

  return data.data;
};

export const useGetMiningProgress = (req: Request) => {
  return useQuery<TotalMiningPlanet, AxiosError>({
    queryKey: ["miningProgress", JSON.stringify(req.uid)],
    queryFn: () => getMiningProgress(req),
    enabled: !!req.uid,
  });
};

export const useGetMiningProgressMutation = () => {
  return useMutation<TotalMiningPlanet, AxiosError, Request>({
    mutationKey: ["miningProgress"],
    mutationFn: getMiningProgress,
  });
};
