import { FC } from "react";
import clsx from "clsx";
import { Button } from "@heroui/button";

import { Rarity } from "@/api/common/types.ts";

const GRADIENT_BY_RARITY: Record<Rarity, string> = {
  [Rarity.COMMON]: "from-lime-500 to-emerald-600",
  [Rarity.UNCOMMON]: "from-sky-500 to-indigo-600",
  [Rarity.RARE]: "from-pink-500 to-purple-600",
  [Rarity.EPIC]: "from-yellow-500 to-amber-600",
  [Rarity.LEGENDARY]: "from-yellow-500 to-red-600",
};

interface Props {
  rarity: Rarity;
  canMine: boolean;
  onClick?: () => void;
}

export const ButtonMine: FC<Props> = ({ rarity, canMine, onClick }) => {
  const gradientColors = GRADIENT_BY_RARITY[rarity];

  return (
    <Button
      className={clsx(
        "px-8 py-4 rounded-2xl font-bold text-lg shadow-xl transition-all",
        canMine
          ? `bg-gradient-to-r ${gradientColors} text-white`
          : "bg-gray-800 text-gray-500 cursor-not-allowed",
      )}
      disabled={!canMine}
      onPress={onClick}
    >
      {canMine ? "MINE" : "NO SLOTS"}
    </Button>
  );
};
