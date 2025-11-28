import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { ResponseServer } from "@/api/common/types.ts";
import axiosInstance from "@/api/axios/instance.ts";
import { Ship } from "@/api/ship/types.ts";

type Response = ResponseServer<Ship>;

const getCurrentShip = async () => {
  const url = "/ship/current_ship";

  const { data } = await axiosInstance.get<Response>(url);

  return data.data;
};

export const useGetCurrentShip = () => {
  return useQuery<Ship, AxiosError>({
    queryKey: ["currentShip"],
    queryFn: getCurrentShip,
  });
};
