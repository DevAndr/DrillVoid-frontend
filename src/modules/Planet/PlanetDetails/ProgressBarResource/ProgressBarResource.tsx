import { FC, useMemo } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

import { ResourcePlanet } from "@/api/planet/types.ts";

interface Props {
  index: number;
  resource: ResourcePlanet;
}

export const ProgressBarResource: FC<Props> = ({ resource, index }) => {
  const progress = useMemo(
    () =>
      ((resource.remainingAmount || resource.current) / resource.totalAmount) *
      100,
    [resource],
  );

  return (
    <div className="mt-3 h-3 bg-white/10 rounded-full overflow-hidden">
      <motion.div
        animate={{
          width: `${progress}%`,
        }}
        className={clsx(
          "h-full",
          resource.rarity === "LEGENDARY" &&
            "bg-gradient-to-r from-yellow-400 to-red-500",
          resource.rarity === "EPIC" &&
            "bg-gradient-to-r from-yellow-400 to-amber-500",
          resource.rarity === "RARE" &&
            "bg-gradient-to-r from-pink-400 to-purple-400",
          resource.rarity === "UNCOMMON" &&
            "bg-gradient-to-r from-sky-400 to-indigo-500",
          resource.rarity === "COMMON" &&
            "bg-gradient-to-r from-lime-400 to-emerald-500",
        )}
        initial={{ width: 0 }}
        transition={{ duration: 1, delay: index * 0.1 }}
      />
    </div>
  );
};
