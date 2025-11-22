import { motion } from "framer-motion";
import { FC } from "react";

import { formatNumberShort, getColorNameByRarity } from "@/utils";
import { Planet } from "@/api/planet/types.ts";

const rarityColors = {
  COMMON: "text-gray-400 border-gray-600",
  UNCOMMON: "text-blue-400 border-blue-600",
  RARE: "text-purple-400 border-purple-600",
  EPIC: "text-pink-400 border-pink-600",
  LEGENDARY: "text-yellow-400 border-yellow-600 animate-pulse",
};

const biomeGradients = {
  FROZEN: "from-cyan-900/80 to-blue-950/90",
  TOXIC: "from-green-900/80 to-emerald-950/90",
  LUSH: "from-emerald-800/80 to-green-950/90",
  BLACKHOLE: "from-purple-950/90 via-black to-pink-950/90",
  ROCKY: "from-orange-900/70 to-red-950/90",
  SCORCHED: "from-red-900/80 to-orange-950/90",
  EXOTIC: "from-indigo-900/90 via-purple-900 to-pink-900/90",
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
}

export const PlanetItem: FC<Props> = ({ planet }) => {
  const colorName = getColorNameByRarity(planet.rarity);
  const totalResources = planet.resources.reduce(
    (a: number, r: any) => a + r.totalAmount,
    0,
  );
  const legendaryCount = planet.resources.filter(
    (r: any) => r.rarity === "LEGENDARY",
  ).length;

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-3xl bg-black/60 backdrop-blur-xl border cursor-pointer
                 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20"
      initial={{ opacity: 0, y: 20 }}
      style={{
        backgroundImage: `linear-gradient(to bottom, ${biomeGradients[planet.biome as keyof typeof biomeGradients] || "from-gray-900 to-black"})`,
        borderColor: legendaryCount > 0 ? "#f59e0b" : "#374151",
        boxShadow:
          legendaryCount > 0
            ? "0 0 30px rgba(251, 191, 36, 0.4)"
            : "0 4px 20px rgba(0,0,0,0.5)",
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Glow для легендарных */}
      {legendaryCount > 0 && (
        <div className="absolute inset-0 bg-yellow-500/10 blur-3xl animate-pulse" />
      )}

      <div className="p-5 relative z-10">
        {/* Название + биом */}
        <h3 className={`text-xl font-bold tracking-wider ${colorName}`}>
          {planet.name}
        </h3>
        <div className="flex items-center gap-3 mt-1 text-sm">
          <span className="px-3 py-1 rounded-full bg-white/10 text-white/80 border border-white/20">
            {planet.biome.toLowerCase()}
          </span>
          {legendaryCount > 0 && (
            <span className="flex items-center gap-1 text-yellow-400 font-bold">
              LEGENDARY
            </span>
          )}
        </div>

        {/* Ресурсы */}
        <div className="mt-4 space-y-2">
          {planet.resources
            .sort(
              (a: any, b: any) =>
                ["LEGENDARY", "EPIC", "RARE", "UNCOMMON", "COMMON"].indexOf(
                  b.rarity,
                ) -
                ["LEGENDARY", "EPIC", "RARE", "UNCOMMON", "COMMON"].indexOf(
                  a.rarity,
                ),
            )
            .map((res: any) => {
              const cfg = rarityConfig[res.rarity as keyof typeof rarityConfig];
              const isEpicOrHigher = ["EPIC", "LEGENDARY"].includes(res.rarity);

              return (
                <motion.div
                  key={`${res.type}-${res.rarity}`}
                  animate={{ opacity: 1, x: 0 }}
                  className={`relative overflow-hidden rounded-xl p-3 border ${cfg.border} ${cfg.bg} ${cfg.animate || ""}`}
                  initial={{ opacity: 0, x: -20 }}
                  transition={{ delay: 0.1 }}
                >
                  {/* РАДУЖНЫЙ ГРАДИЕНТ ДЛЯ ЛЕГЕНДАРОК */}
                  {res.rarity === "LEGENDARY" && (
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 opacity-30 animate-rainbow" />
                  )}

                  {/* ПАРТИКЛЫ (простые точки) */}
                  {cfg.particles && (
                    <>
                      <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
                        {[...Array(6)].map((_, i) => (
                          <motion.div
                            key={i}
                            animate={{
                              y: [-20, 20],
                              opacity: [0, 1, 0],
                            }}
                            className="absolute w-1 h-1 bg-white rounded-full"
                            style={{ left: `${20 + i * 15}%` }}
                            transition={{
                              duration: 2 + i * 0.3,
                              repeat: Infinity,
                              ease: "easeOut",
                            }}
                          />
                        ))}
                      </div>
                    </>
                  )}

                  <div className="relative z-10 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      {/* Иконки редкости */}
                      {res.rarity === "LEGENDARY" && "✦ "}
                      {res.rarity === "EPIC" && "◆ "}
                      {res.rarity === "RARE" && "★ "}
                      <span className={`font-bold ${cfg.text} drop-shadow-lg`}>
                        {res.type}
                      </span>
                      {res.rarity === "LEGENDARY" && " ✦"}
                    </div>

                    <span className="font-mono text-white/90 text-lg font-bold">
                      {(res.totalAmount / 1000).toFixed(0)}k
                    </span>
                  </div>

                  {/* Подсветка снизу */}
                  {isEpicOrHigher && (
                    <div
                      className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${
                        res.rarity === "LEGENDARY"
                          ? "from-yellow-400 via-pink-500 to-purple-600"
                          : "from-pink-500 to-purple-600"
                      }`}
                    />
                  )}
                </motion.div>
              );
            })}

          {planet.resources.length > 4 && (
            <div className="text-xs text-gray-400 pt-1">
              + {planet.resources.length - 4} more...
            </div>
          )}
        </div>

        {/* Нижняя строка */}
        <div className="mt-4 pt-3 border-t border-white/10 flex justify-between text-xs text-gray-400">
          <span>{planet.resources.length} resources</span>
          <span className="font-mono text-white/70">
            {formatNumberShort(totalResources)} total
          </span>
        </div>
      </div>
    </motion.div>
  );
};
