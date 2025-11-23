import { Rarity } from "@/api/common/types.ts";

export const getColorNameByRarity = (rarity: Rarity) => {
  switch (rarity) {
    case Rarity.COMMON:
      return "text-emerald-500";
    case Rarity.UNCOMMON:
      return "text-indigo-500";
    case Rarity.RARE:
      return "text-amber-500";
    case Rarity.EPIC:
      return "text-purple-500";
    case Rarity.LEGENDARY:
      return "text-red-500";
  }
};
