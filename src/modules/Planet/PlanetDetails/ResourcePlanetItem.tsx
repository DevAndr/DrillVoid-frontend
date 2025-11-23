import { FC } from "react";
import { Button } from "@heroui/button";

import { ResourcePlanet } from "@/api/planet/types.ts";
import { formatNumberShort } from "@/utils";
import { rarityColors } from "@/modules/Planet/PlanetList/PlanetItem/PlanetItem.tsx";

interface Props {
  resource: ResourcePlanet;
}

export const ResourcePlanetItem: FC<Props> = ({ resource }) => {
  console.log({ resource });

  return (
    <div className="flex justify-between gap-2">
      <div>
        <div
          className={`${rarityColors[resource.rarity as keyof typeof rarityColors] || "text-gray-300"}`}
        >
          {resource?.type}
        </div>
        <div className="text-amber-200 text-xs">
          {formatNumberShort(resource.remainingAmount)}/
          {formatNumberShort(resource.totalAmount)}
        </div>
      </div>
      <Button color={"primary"}>Майнить</Button>
    </div>
  );
};
