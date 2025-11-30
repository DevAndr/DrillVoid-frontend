import { FC, useState } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";

import { ResourcePlanet } from "@/api/planet/types.ts";
import { formatNumberShort } from "@/utils";
import { rarityColors } from "@/modules/Planet/PlanetList/PlanetItem/PlanetItem.tsx";
import { EpicSparkles, LegendarySparkles } from "@/pages/Planet/PlanetPage.tsx";
import { getNameRarityForResource } from "@/modules/Planet/PlanetList/PlanetItem/utils/getNameRarityForResource.ts";
import { ProgressBarResource } from "@/modules/Planet/PlanetDetails/ProgressBarResource/ProgressBarResource.tsx";
import { MiningProcess } from "@/modules/Planet/PlanetDetails/MiningProcess/MiningProcess.tsx";
import { ButtonMine } from "@/modules/Planet/PlanetDetails/ButtonMine/ButtonMine.tsx";

interface Props {
  resource: ResourcePlanet;
  canMine?: boolean;
  index: number;
}

export const ResourcePlanetItem: FC<Props> = ({ resource, canMine, index }) => {
  const [isRunningMine, setIsRunningMine] = useState(false);

  const currentAmount = resource.remainingAmount || resource.current;
  const isEmptyResource = resource.current <= 0;

  const mineHandler = () => {
    setIsRunningMine(true);
  };

  return (
    <motion.div
      animate={{ opacity: 1, x: 0 }}
      className={clsx(
        "relative overflow-hidden rounded-2xl p-5 border-2 backdrop-blur-xl",
        rarityColors[resource.rarity as keyof typeof rarityColors],
        resource.rarity === "LEGENDARY" &&
          "bg-red-900/20 shadow-2xl shadow-red-500/50",
        resource.rarity === "EPIC" &&
          "bg-amber-900/20 shadow-2xl shadow-amber-500/40",
      )}
      initial={{ opacity: 0, x: -50 }}
      transition={{ delay: index * 0.1 }}
    >
      {resource.rarity === "LEGENDARY" && <LegendarySparkles />}
      {resource.rarity === "EPIC" && <EpicSparkles />}

      <div className="flex-1">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold">{resource.type}</span>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold font-mono">
              {formatNumberShort(resource.totalAmount)}
            </div>
            <div className="text-sm opacity-70">
              {getNameRarityForResource(resource.rarity)}
            </div>
            <div className="text-sm opacity-70 mt-1">
              •{" "}
              {currentAmount === resource.totalAmount
                ? "Не тронуто"
                : `${((currentAmount / resource.totalAmount) * 100).toFixed(0)}% left`}
            </div>
          </div>
        </div>
      </div>

      {/* Прогресс-бар */}
      {!isEmptyResource && (
        <ProgressBarResource index={index} resource={resource} />
      )}
      {(canMine || isRunningMine) && (
        <div className="flex flex-col justify-center gap-2 mt-4">
          {isRunningMine ? (
            <MiningProcess />
          ) : (
            !isEmptyResource && (
              <ButtonMine
                canMine={canMine}
                rarity={resource.rarity}
                onClick={mineHandler}
              />
            )
          )}
        </div>
      )}
    </motion.div>
  );
};
