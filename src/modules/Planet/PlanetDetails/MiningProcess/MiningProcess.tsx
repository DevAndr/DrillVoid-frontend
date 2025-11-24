import { FC } from "react";
import { Pickaxe } from "lucide-react";

interface Props {}

export const MiningProcess: FC<Props> = () => {
  return (
    <div className="text-right">
      <div className="text-green-400 font-bold text-lg animate-pulse flex items-center content-end justify-end gap-2">
        <Pickaxe className="w-4 h-4" />
        <span>Mining</span>
      </div>
      <div className="text-xs text-gray-400">+123/sec</div>
    </div>
  );
};
