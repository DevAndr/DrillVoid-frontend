import { Clock, Pickaxe, Zap } from "lucide-react";
import { FC } from "react";
import clsx from "clsx";

import { formatNumberShort } from "@/utils";
import { useGetTimeMiningPlanet } from "@/api/planet/useGetTimeMiningPlanet.ts";

interface Props {
  countResources: number;
  totalAmountResources: number;
  seed?: string;
  small?: boolean;
}

export const StatisticPlanet: FC<Props> = ({
  countResources,
  totalAmountResources,
  seed,
  small,
}) => {
  const { data: dataTimeMining } = useGetTimeMiningPlanet({
    payload: { uid: "3eece72d-2880-454c-a66e-702b8e84f7df", seed },
  });

  return (
    <div
      className={clsx(
        "max-w-2xl mx-auto grid grid-cols-3 gap-4 mb-10",
        small ? "px-0" : "px-6",
      )}
    >
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 text-center">
        <Pickaxe className="w-8 h-8 mx-auto mb-2 text-cyan-400" />
        <div className="text-xl font-bold">{countResources}</div>
        <div className="text-gray-400 text-sm">Resources</div>
      </div>
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 text-center">
        <Zap className="w-8 h-8 mx-auto mb-2 text-pink-400" />
        <div className="text-xl font-bold">
          {formatNumberShort(totalAmountResources)}
        </div>
        <div className="text-gray-400 text-sm">Total volume</div>
      </div>
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 text-center">
        <Clock className="w-8 h-8 mx-auto mb-2 text-purple-400" />
        <div className="text-xl font-bold">
          ~{dataTimeMining?.totalTimeMining}h
        </div>
        <div className="text-gray-400 text-sm">Mining time</div>
      </div>
    </div>
  );
};
