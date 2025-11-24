import { Rarity } from "@/api/common/types.ts";

export const getNameRarityForResource = (rarity: Rarity) => {
  switch (rarity) {
    case Rarity.COMMON:
      return "Обычный";
    case Rarity.UNCOMMON:
      return "Необычный";
    case Rarity.RARE:
      return "Редкий";
    case Rarity.EPIC:
      return "Эпичный";
    case Rarity.LEGENDARY:
      return "Легендарный";
  }
};
