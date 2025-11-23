import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { ResponseServer } from "@/api/common/types.ts";
import { PayloadScanPlanets, Planet } from "@/api/planet/types.ts";
import axiosInstance from "@/api/axios/instance.ts";

type Request = PayloadScanPlanets;
type Response = ResponseServer<Planet[]>;

const scanNearbyPlanets = async (req: Request) => {
  const url = "/planet/scan_planets";

  const { data } = await axiosInstance.post<Response>(url, req);

  return data.data;
};

export const useScanNearByPlanets = () => {
  return useMutation<Planet[], AxiosError, Request>({
    mutationFn: (req) => scanNearbyPlanets(req),
    mutationKey: ["nearbyPlanets"],
  });
};
