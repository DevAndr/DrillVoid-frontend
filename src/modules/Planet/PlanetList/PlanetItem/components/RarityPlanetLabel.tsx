import { FC } from "react";

import { Rarity } from "@/api/common/types.ts";
import { getNameRarity } from "@/modules/Planet/PlanetList/PlanetItem/utils/getNameRarity.ts";
import { getClassNamesBodyCardByRarity } from "@/modules/Planet/PlanetList/PlanetItem/utils/getClassNamesBodyCardByRarity.tsx";
import { getBorderByRarity } from "@/modules/Planet/PlanetList/PlanetItem/utils/getBorderByRarity.ts";

interface Props {
  rarity: Rarity;
}

export const RarityPlanetLabel: FC<Props> = ({ rarity }) => {
  const nameRarityPlanet = getNameRarity(rarity);
  const colorRarityPlanet = getClassNamesBodyCardByRarity(rarity);
  const border = getBorderByRarity(rarity);

  return (
    <span
      className={`h-fit px-2 py-1 text-xs rounded-full bg-white/10 ${colorRarityPlanet} border ${border}`}
    >
      {nameRarityPlanet}
    </span>
  );
};
