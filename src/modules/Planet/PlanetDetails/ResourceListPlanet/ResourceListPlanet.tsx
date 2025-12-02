import { FC, useMemo } from "react";
import clsx from "clsx";

import { ResourcePlanet } from "@/api/planet/types.ts";
import { ResourcePlanetItem } from "@/modules/Planet/PlanetDetails/ResourcePlanetItem.tsx";

interface Props {
  resources: ResourcePlanet[];
  isAccessMining?: boolean;
  small?: boolean;
  planetId?: any;
}

export const ResourceListPlanet: FC<Props> = ({
  resources,
  isAccessMining,
  small,
  planetId,
}) => {
  const sortedResources = useMemo(
    () =>
      resources.sort(
        (a: any, b: any) =>
          ["LEGENDARY", "EPIC", "RARE", "UNCOMMON", "COMMON"].indexOf(
            b.rarity,
          ) -
          ["LEGENDARY", "EPIC", "RARE", "UNCOMMON", "COMMON"].indexOf(a.rarity),
      ),
    [],
  );

  return (
    <div className={clsx("max-w-2xl mx-auto", small ? "px-0" : "px-6")}>
      <h2 className="text-2xl font-bold mb-6 text-center">
        Available Resources
      </h2>
      <div className="space-y-4">
        {sortedResources.map((res: any, i: number) => (
          <ResourcePlanetItem
            key={i}
            canMine={isAccessMining}
            index={i}
            planetId={planetId}
            resource={res}
          />
        ))}
      </div>
    </div>
  );
};
