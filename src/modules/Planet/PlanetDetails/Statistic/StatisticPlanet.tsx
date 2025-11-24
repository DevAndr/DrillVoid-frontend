import { Clock, Pickaxe, Zap } from "lucide-react";
import { FC } from "react";

import { formatNumberShort } from "@/utils";

interface Props {
  countResources: number;
  totalAmountResources: number;
}

export const StatisticPlanet: FC<Props> = ({
  countResources,
  totalAmountResources,
}) => {
  return (
    <div className="max-w-2xl mx-auto px-6 grid grid-cols-3 gap-4 mb-10">
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
        <div className="text-xl font-bold">~24h</div>
        <div className="text-gray-400 text-sm">Mining time</div>
      </div>
    </div>
  );
};
