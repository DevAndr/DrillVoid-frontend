import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import axiosInstance from "@/api/axios/instance.ts";
import { ResponseServer } from "@/api/common/types.ts";
import { PlanetDetails } from "@/api/planet/types.ts";

type Request = {
  seed: string;
};
type Response = ResponseServer<PlanetDetails>;

const getPlanetBySeed = async ({ seed }: Request) => {
  const url = `/planet/generate_planet_by_seed/${seed}`;

  const { data } = await axiosInstance.get<Response>(url);

  return data.data;
};

export const useGetPlanetBySeed = (req: Request) => {
  return useQuery<PlanetDetails, AxiosError>({
    queryKey: ["planetBySeed"],
    queryFn: () => getPlanetBySeed(req),
    enabled: !!req.seed,
  });
};
