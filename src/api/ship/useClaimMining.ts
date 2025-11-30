import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { ResponseServer } from "@/api/common/types.ts";
import axiosInstance from "@/api/axios/instance.ts";
import { MiningResponse } from "@/api/ship/types.ts";

type Response = ResponseServer<any>;

const claimMining = async () => {
  const url = "/ship/claim_mining";

  const { data } = await axiosInstance.post<Response>(url);

  return data.data;
};

export const useClaimMining = () => {
  return useMutation<MiningResponse, AxiosError>({
    mutationKey: ["miningClaim"],
    mutationFn: claimMining,
  });
};
