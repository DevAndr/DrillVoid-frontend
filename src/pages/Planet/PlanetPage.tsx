import { useNavigate, useParams } from "react-router-dom";
import { Spinner } from "@heroui/spinner";
import { motion } from "framer-motion";
import clsx from "clsx";
import { ChevronLeft, Clock, Pickaxe, Zap } from "lucide-react";
import { Button } from "@heroui/button";
import { useEffect } from "react";

import { useGetPlanetBySeed } from "@/api/planet/useGetPlanetBySeed.ts";
import { CenteredLayout } from "@/layouts";
import { formatNumberShort, isDefined } from "@/utils";
import { biomeGradients } from "@/modules/Planet/PlanetList/PlanetItem/PlanetItem.tsx";
import PlanetIcon from "@/assets/icons/Planet.tsx";
import { RarityPlanetLabel } from "@/modules/Planet/PlanetList/PlanetItem/components/RarityPlanetLabel.tsx";
import { getNameRarityForResource } from "@/modules/Planet/PlanetList/PlanetItem/utils/getNameRarityForResource.ts";
import { ButtonMine } from "@/pages/Planet/components/ButtonMine/ButtonMine.tsx";

const rarityColors = {
  COMMON: "text-emerald-400 border-emerald-600",
  UNCOMMON: "text-indigo-400 border-indigo-600",
  RARE: "text-purple-400 border-purple-600",
  EPIC: "text-amber-400 border-amber-600",
  LEGENDARY: "text-red-400 border-red-500",
};

const PlanetPage = () => {
  const navigate = useNavigate();
  const { seed } = useParams();
  // @ts-ignore
  const { data, isLoading } = useGetPlanetBySeed({ seed });

  useEffect(() => window.scrollTo(0, 0), []);

  const backHandle = () => {
    navigate(-1);
  };

  if (isLoading) {
    return (
      <CenteredLayout>
        <Spinner />
      </CenteredLayout>
    );
  }

  if (!isDefined(data)) return null;

  const totalResources = data.resources.reduce(
    (a: number, r: any) => a + r.totalAmount,
    0,
  );

  const isActive = false;
  const canMine = true;

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Фон с градиентом биома */}
      <div
        className="fixed inset-0 opacity-50"
        style={{
          backgroundImage: biomeGradients[data.biome] || biomeGradients.DEFAULT,
        }}
      />

      {/* Кнопка назад */}
      <Button
        isIconOnly
        className="fixed top-4 left-4 z-50 bg-black/30 backdrop-blur-xl p-3 rounded-full border border-white/10 hover:border-white/50 transition-all"
        onPress={backHandle}
      >
        <ChevronLeft />
      </Button>

      <div className="relative pb-32">
        {/* Заголовок + большая иконка планеты */}
        <div className="text-center mb-10">
          <motion.div
            animate={{ scale: 1, rotate: 0 }}
            className="inline-block"
            initial={{ scale: 0, rotate: -180 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <div className="relative mx-auto w-48 h-48">
              <div
                className={clsx(
                  "w-full h-full rounded-full flex items-center justify-center text-9xl font-bold shadow-2xl",
                  "bg-gradient-to-br",
                  data.biome === "FROZEN" && "from-cyan-300 to-blue-800",
                  data.biome === "TOXIC" && "from-green-400 to-emerald-800",
                  data.biome === "LUSH" && "from-emerald-400 to-green-800",
                  data.biome === "BLACKHOLE" &&
                    "from-purple-900 via-black to-pink-900",
                  data.biome === "EXOTIC" &&
                    "from-purple-600 via-pink-600 to-indigo-700",
                )}
              >
                <PlanetIcon biome={data.biome} size={240} />
              </div>
            </div>
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-widest">
            {data.name}
          </h1>
          <div className="flex items-center justify-center gap-4 mt-3 text-xs">
            <span className="px-2 py-1 rounded-full bg-white/10 border border-white/20">
              {data.biome}
            </span>
            <RarityPlanetLabel rarity={data.rarity} />
          </div>
        </div>

        {/* Статистика */}
        <div className="max-w-2xl mx-auto px-6 grid grid-cols-3 gap-4 mb-10">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 text-center">
            <Pickaxe className="w-8 h-8 mx-auto mb-2 text-cyan-400" />
            <div className="text-xl font-bold">{data.resources.length}</div>
            <div className="text-gray-400 text-sm">Resources</div>
          </div>
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 text-center">
            <Zap className="w-8 h-8 mx-auto mb-2 text-pink-400" />
            <div className="text-xl font-bold">
              {formatNumberShort(totalResources)}
            </div>
            <div className="text-gray-400 text-sm">Total volume</div>
          </div>
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 text-center">
            <Clock className="w-8 h-8 mx-auto mb-2 text-purple-400" />
            <div className="text-xl font-bold">~24h</div>
            <div className="text-gray-400 text-sm">Mining time</div>
          </div>
        </div>

        {/* Список ресурсов */}
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Available Resources
          </h2>
          <div className="space-y-4">
            {data.resources
              .sort(
                (a: any, b: any) =>
                  ["LEGENDARY", "EPIC", "RARE", "UNCOMMON", "COMMON"].indexOf(
                    b.rarity,
                  ) -
                  ["LEGENDARY", "EPIC", "RARE", "UNCOMMON", "COMMON"].indexOf(
                    a.rarity,
                  ),
              )
              .map((res: any, i: number) => (
                <motion.div
                  key={i}
                  animate={{ opacity: 1, x: 0 }}
                  className={clsx(
                    "relative overflow-hidden rounded-2xl p-5 border-2 backdrop-blur-xl",
                    rarityColors[res.rarity as keyof typeof rarityColors],
                    res.rarity === "LEGENDARY" &&
                      "bg-red-900/20 shadow-2xl shadow-red-500/50",
                    res.rarity === "EPIC" &&
                      "bg-amber-900/20 shadow-2xl shadow-amber-500/40",
                  )}
                  initial={{ opacity: 0, x: -50 }}
                  transition={{ delay: i * 0.1 }}
                >
                  {res.rarity === "LEGENDARY" && <LegendarySparkles />}
                  {res.rarity === "EPIC" && <EpicSparkles />}

                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-bold">{res.type}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold font-mono">
                          {formatNumberShort(res.totalAmount)}
                        </div>
                        <div className="text-sm opacity-70">
                          {getNameRarityForResource(res.rarity)}
                        </div>
                        <div className="text-sm opacity-70 mt-1">
                          •{" "}
                          {res.remainingAmount === res.totalAmount
                            ? "Не тронуто"
                            : `${((res.remainingAmount / res.totalAmount) * 100).toFixed(0)}% left`}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Прогресс-бар */}
                  <div className="mt-3 h-3 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      animate={{
                        width: `${(res.remainingAmount / res.totalAmount) * 100}%`,
                      }}
                      className={clsx(
                        "h-full",
                        res.rarity === "LEGENDARY" &&
                          "bg-gradient-to-r from-yellow-400 to-red-500",
                        res.rarity === "EPIC" &&
                          "bg-gradient-to-r from-yellow-400 to-amber-500",
                        res.rarity === "RARE" &&
                          "bg-gradient-to-r from-pink-400 to-purple-400",
                        res.rarity === "UNCOMMON" &&
                          "bg-gradient-to-r from-sky-400 to-indigo-500",
                        res.rarity === "COMMON" &&
                          "bg-gradient-to-r from-lime-400 to-emerald-500",
                      )}
                      initial={{ width: 0 }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                    />
                  </div>
                  <div className="flex flex-col justify-center gap-2 mt-4">
                    {isActive ? (
                      <div className="text-right">
                        <div className="text-green-400 font-bold text-lg animate-pulse">
                          MINING
                        </div>
                        <div className="text-xs text-gray-400">+123/sec</div>
                      </div>
                    ) : (
                      <ButtonMine canMine={canMine} rarity={res.rarity} />
                    )}
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanetPage;

const LegendarySparkles = () => {
  const particleCount = 16;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
      {[...Array(particleCount)].map((_, i) => {
        // Рандомные параметры
        const duration = 1.8 + Math.random() * 2; // 1.8–3.8 сек
        const delay = Math.random() * 1.5;
        const size = 4 + Math.random() * 8; // 4–12px
        const angle = Math.random() * 360; // любое направление
        const distance = 80 + Math.random() * 120; // насколько далеко улетит
        const hue = 45 + Math.random() * 30; // от золотого до оранжевого

        return (
          <motion.div
            key={i}
            animate={{
              x: [0, Math.cos((angle * Math.PI) / 180) * distance],
              y: [0, Math.sin((angle * Math.PI) / 180) * distance],
              opacity: [0, 1, 1, 0],
              scale: [0, 1.2, 0.8, 0],
            }}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              left: `${20 + Math.random() * 60}%`,
              top: `${30 + Math.random() * 40}%`,
              background: `radial-gradient(circle, hsl(${hue}, 100%, 70%), transparent 70%)`,
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        );
      })}
    </div>
  );
};

const EpicSparkles = () => (
  <div className="absolute inset-0 pointer-events-none">
    {[...Array(10)].map((_, i) => (
      <motion.div
        key={i}
        animate={{
          y: [-30, -150],
          x: (Math.random() - 0.5) * 100,
          opacity: [0, 1, 0],
        }}
        className="absolute w-2 h-2 bg-amber-400 rounded-full"
        style={{
          left: `${20 + Math.random() * 60}%`,
          top: `${20 + Math.random() * 60}%`,
        }}
        transition={{
          duration: 2.5 + Math.random(),
          repeat: Infinity,
          delay: Math.random() * 2,
        }}
      />
    ))}
  </div>
);
