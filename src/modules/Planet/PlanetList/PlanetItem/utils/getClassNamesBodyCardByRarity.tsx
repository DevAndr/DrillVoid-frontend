import { Rarity } from "@/api/common/types.ts";

export const getClassNamesBodyCardByRarity = (rarity: Rarity) => {
  switch (rarity) {
    case Rarity.COMMON:
      return "text-emerald-500/80";
    case Rarity.UNCOMMON:
      return "text-indigo-500/80";
    case Rarity.RARE:
      return "text-purple-500/80";
    case Rarity.EPIC:
      return "text-amber-500/80";
    case Rarity.LEGENDARY:
      return "text-red-500/80";
  }
};
