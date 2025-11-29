import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { ResponseServer } from "@/api/common/types.ts";
import axiosInstance from "@/api/axios/instance.ts";
import { StartMiningResponse } from "@/api/ship/types.ts";

type Request = {
  uid: string;
  planetId: string;
  resourceId: string;
};
type Response = ResponseServer<StartMiningResponse>;

const startMining = async (req: Request) => {
  const url = "/ship/start_mining";

  const { data } = await axiosInstance.post<Response>(url, req);

  return data.data;
};

export const useStartMining = (req: Request) => {
  return useMutation<StartMiningResponse, AxiosError, Request>({
    mutationFn: startMining,
    mutationKey: ["startMining", JSON.stringify(req)],
  });
};
