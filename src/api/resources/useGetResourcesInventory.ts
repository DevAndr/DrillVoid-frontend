import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { ResponseServer } from "@/api/common/types.ts";
import { ResourceInventory } from "@/api/resources/types.ts";
import axiosInstance from "@/api/axios/instance.ts";

type Response = ResponseServer<ResourceInventory[]>;

const getResourcesInventory = async () => {
  const url = "/game-data/resources";

  const { data } = await axiosInstance.get<Response>(url);

  return data.data;
};

export const useGetResourcesInventory = () => {
  return useQuery<ResourceInventory[], AxiosError>({
    queryFn: getResourcesInventory,
    queryKey: ["resources"],
  });
};
