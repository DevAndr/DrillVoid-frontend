import { motion } from "framer-motion";
import { FC } from "react";

import { formatNumberShort, getColorNameByRarity, pluralize } from "@/utils";
import { Planet } from "@/api/planet/types.ts";
import PlanetIcon from "@/assets/icons/Planet.tsx";
import { RarityPlanetLabel } from "@/modules/Planet/PlanetList/PlanetItem/components/RarityPlanetLabel.tsx";

const rarityColors = {
  COMMON: "text-emerald-400 border-gray-600",
  UNCOMMON: "text-indigo-400 border-blue-600",
  RARE: "text-purple-400 border-purple-600",
  EPIC: "text-amber-400 border-pink-600",
  LEGENDARY: "text-red-400 border-yellow-600 animate-pulse",
};

const biomeGradients: Record<string, string> = {
  FROZEN:
    "linear-gradient(to bottom, rgba(6, 182, 212, 0.3), rgba(30, 58, 138, 0.6))",
  TOXIC:
    "linear-gradient(to bottom, rgba(34, 197, 94, 0.4), rgba(20, 184, 166, 0.6))",
  LUSH: "linear-gradient(to bottom, rgba(16, 185, 129, 0.4), rgba(34, 197, 94, 0.6))",
  BLACKHOLE:
    "linear-gradient(to bottom, rgba(147, 51, 234, 0.6), rgba(0, 0, 0, 1))",
  SCORCHED:
    "linear-gradient(to bottom, rgba(239, 68, 68, 0.4), rgba(249, 115, 22, 0.6))",
  EXOTIC:
    "linear-gradient(to bottom, rgba(168, 85, 247, 0.6), rgba(236, 72, 153, 0.6))",
  ROCKY:
    "linear-gradient(to bottom, rgba(251, 146, 60, 0.3), rgba(120, 53, 15, 0.6))",
  // fallback
  DEFAULT: "linear-gradient(to bottom, from-gray-900 to-black)",
};

export const rarityConfig = {
  COMMON: {
    text: "text-gray-400",
    bg: "bg-gray-900/50",
    border: "border-gray-700",
    glow: "shadow-gray-500/20",
  },
  UNCOMMON: {
    text: "text-blue-400",
    bg: "bg-blue-900/30",
    border: "border-blue-600",
    glow: "shadow-blue-500/30",
  },
  RARE: {
    text: "text-purple-400",
    bg: "bg-purple-900/40",
    border: "border-purple-500",
    glow: "shadow-purple-500/40",
  },
  EPIC: {
    text: "text-pink-400",
    bg: "bg-pink-900/50",
    border: "border-pink-500",
    glow: "shadow-pink-500/60",
    particles: true,
    animate: "animate-pulse",
  },
  LEGENDARY: {
    text: "text-yellow-400",
    bg: "bg-yellow-900/60",
    border: "border-yellow-400",
    glow: "shadow-yellow-400/80",
    particles: true,
    animate: "animate-pulse",
    rainbow: true,
  },
};

interface Props {
  planet: Planet;
  onClick?: () => void;
}

export const PlanetItem: FC<Props> = ({ planet, onClick }) => {
  const colorName = getColorNameByRarity(planet.rarity);
  const totalResources = planet.resources.reduce(
    (a: number, r: any) => a + r.totalAmount,
    0,
  );
  const epicCount = planet.resources.filter(
    (r: any) => r.rarity === "EPIC",
  ).length;

  const legendaryCount = planet.resources.filter(
    (r: any) => r.rarity === "LEGENDARY",
  ).length;

  const maxRarity =
    legendaryCount > 0
      ? "LEGENDARY"
      : epicCount > 0
        ? "EPIC"
        : planet.resources[0]?.rarity || "COMMON";

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-3xl bg-black/60 backdrop-blur-xl border cursor-pointer
                 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20"
      initial={{ opacity: 0, y: 20 }}
      style={{
        backgroundImage: biomeGradients.DEFAULT,
        borderColor:
          legendaryCount > 0
            ? "#f5510b"
            : epicCount > 0
              ? "#f59e0b"
              : "#212834",
        boxShadow:
          legendaryCount > 0
            ? "rgb(251 97 36 / 40%) 0px 0px 30px"
            : epicCount > 0
              ? "0 0 30px rgba(251, 191, 36, 0.4)"
              : "0 4px 20px rgba(0,0,0,0.5)",
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      {/* Glow для легендарных */}
      {legendaryCount > 0 && (
        <div className="absolute inset-0 bg-red-500/10 blur-3xl animate-pulse" />
      )}
      {epicCount > 0 && (
        <div className="absolute inset-0 bg-yellow-500/10 blur-3xl animate-pulse" />
      )}

      <motion.div
        animate={{ scale: 1, opacity: 1 }}
        className="relative"
        initial={{ scale: 0, opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* ВСПЫШКА ПРИ ОТКРЫТИИ ЛЕГЕНДАРКИ */}
        {maxRarity === "LEGENDARY" && (
          <motion.div
            animate={{ scale: 4, opacity: 0 }}
            className="absolute inset-0 rounded-3xl"
            initial={{ scale: 0, opacity: 1 }}
            style={{
              background:
                "radial-gradient(circle, #fbbf24 10%, transparent 70%)",
              filter: "blur(20px)",
            }}
            transition={{ duration: 1.2 }}
          />
        )}

        <div className="flex items-center justify-center">
          <PlanetIcon biome={planet.biome} size={80} />
        </div>
      </motion.div>
      <div className="p-4 pt-0 relative z-10">
        {/* Название + биом */}
        <h3
          className={`text-xl text-center font-bold tracking-wider ${colorName}`}
        >
          {planet.name}
        </h3>

        <div className="flex items-center gap-3 mt-1 text-small">
          <span className="px-2 py-1 text-xs rounded-full bg-white/10 text-white/80 border border-white/20">
            {planet.biome.toLowerCase()}
          </span>
          <RarityPlanetLabel rarity={planet.rarity} />
        </div>

        {/* Ресурсы */}
        <div className="mt-4 space-y-2">
          {planet.resources
            .sort((a: any, b: any) => b.totalAmount - a.totalAmount)
            .slice(0, 4) // Показываем топ-4
            .map((res: any, i: number) => (
              <div
                key={i}
                className="flex justify-between items-center text-xs"
              >
                <span
                  className={`font-medium ${rarityColors[res.rarity as keyof typeof rarityColors] || "text-gray-300"}`}
                >
                  {res.type.toString().toLowerCase()}
                </span>
                <span className="text-white/80 font-mono">
                  {formatNumberShort(res.totalAmount)}
                </span>
              </div>
            ))}

          {planet.resources.length > 4 && (
            <div className="text-xs text-gray-400 pt-1">
              + {planet.resources.length - 4} еще...
            </div>
          )}
        </div>

        {/* Нижняя строка */}
        <div className="mt-4 pt-3 border-t border-white/10 flex justify-between text-xs text-gray-400">
          <span>
            {pluralize(planet.resources.length, [
              "ресурс",
              "ресурса",
              "ресурсов",
            ])}
          </span>
          <span className="font-mono text-white/70">
            {formatNumberShort(totalResources)} всего
          </span>
        </div>
      </div>
    </motion.div>
  );
};
