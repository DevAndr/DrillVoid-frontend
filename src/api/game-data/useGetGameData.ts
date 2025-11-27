import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { ResponseServer } from "@/api/common/types.ts";
import axiosInstance from "@/api/axios/instance.ts";
import { GameDataResponse } from "@/api/game-data/types.ts";

type Request = {
  uid: string;
};

type Response = ResponseServer<GameDataResponse>;

const getGameData = async ({ uid }: Request) => {
  const url = `/game-data/${uid}`;

  const { data } = await axiosInstance.get<Response>(url);

  return data.data;
};

export const useGetGameData = () => {
  return useMutation<GameDataResponse, AxiosError, Request>({
    mutationFn: getGameData,
    mutationKey: ["gameData"],
  });
};
