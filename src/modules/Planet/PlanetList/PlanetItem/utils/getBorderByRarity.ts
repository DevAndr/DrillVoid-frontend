import { Rarity } from "@/api/common/types.ts";

export const getBorderByRarity = (rarity: Rarity) => {
  switch (rarity) {
    case Rarity.COMMON:
      return "border-emerald-500/20";
    case Rarity.UNCOMMON:
      return "border-indigo-500/20";
    case Rarity.RARE:
      return "border-purple-500/20";
    case Rarity.EPIC:
      return "border-amber-500/20";
    case Rarity.LEGENDARY:
      return "border-red-500/20";
  }
};
