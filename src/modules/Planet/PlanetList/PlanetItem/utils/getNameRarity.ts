import { Rarity } from "@/api/common/types.ts";

export const getNameRarity = (rarity: Rarity) => {
  switch (rarity) {
    case Rarity.COMMON:
      return "Обычная";
    case Rarity.UNCOMMON:
      return "Необычная";
    case Rarity.RARE:
      return "Редкая";
    case Rarity.EPIC:
      return "Эпичная";
    case Rarity.LEGENDARY:
      return "Легендарная";
  }
};
