import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import axiosInstance from "@/api/axios/instance.ts";
import { ResponseServer } from "@/api/common/types.ts";
import {
  PayloadTotalTimeMiningPlanet,
  TotalMiningPlanet,
} from "@/api/planet/types.ts";

type Request = {
  payload: PayloadTotalTimeMiningPlanet;
};

type Response = ResponseServer<TotalMiningPlanet>;

const getTimeMiningPlanet = async ({ payload }: Request) => {
  const url = `/planet/time_mining_planet`;

  const { data } = await axiosInstance.post<Response>(url, payload);

  return data.data;
};

export const useGetTimeMiningPlanet = (req: Request) => {
  return useQuery<TotalMiningPlanet, AxiosError>({
    queryKey: ["timeMiningPlanet", JSON.stringify(req.payload)],
    queryFn: () => getTimeMiningPlanet(req),
    enabled: !!req.payload,
  });
};
