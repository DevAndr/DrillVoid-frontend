import React from "react";

import { Rarity } from "@/api/common/types.ts";
import { CircleIcon } from "@/assets/icons/Circle.tsx";

export const getCircleSymbolByRarity = (rarity: Rarity): React.ReactNode => {
  switch (rarity) {
    case Rarity.COMMON:
      return <CircleIcon className="text-emerald-500" size={12} />;
    case Rarity.UNCOMMON:
      return <CircleIcon className="text-indigo-500" size={12} />;
    case Rarity.RARE:
      return <CircleIcon className="text-purple-500" size={12} />;
    case Rarity.EPIC:
      return <CircleIcon className="text-amber-500" size={12} />;
    case Rarity.LEGENDARY:
      return <CircleIcon className="text-red-500" size={12} />;
  }
};
