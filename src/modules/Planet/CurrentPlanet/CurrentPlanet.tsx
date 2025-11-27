import { Spinner } from "@heroui/spinner";
import { motion } from "framer-motion";
import clsx from "clsx";

import { biomeGradients } from "@/modules/Planet/PlanetList/PlanetItem/PlanetItem.tsx";
import { useGetPlanetBySeed } from "@/api/planet/useGetPlanetBySeed.ts";
import { useGameDataState, usePlanetDetailsState } from "@/store/store.ts";
import { CenteredLayout } from "@/layouts";
import { isDefined } from "@/utils";
import PlanetIcon from "@/assets/icons/Planet.tsx";
import { RarityPlanetLabel } from "@/modules/Planet/PlanetList/PlanetItem/components/RarityPlanetLabel.tsx";
import { StatisticPlanet } from "@/modules/Planet/PlanetDetails/Statistic/StatisticPlanet.tsx";
import { ResourceListPlanet } from "@/modules/Planet/PlanetDetails/ResourceListPlanet/ResourceListPlanet.tsx";

export const CurrentPlanet = () => {
  const { seed } = useGameDataState();
  const { isAccessMining } = usePlanetDetailsState();

  // @ts-ignore
  const { data, isLoading } = useGetPlanetBySeed({ seed });

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

  return (
    <div className="bg-black text-white overflow-x-hidden">
      <div
        className="fixed inset-0 opacity-50 pointer-events-none"
        style={{
          backgroundImage: biomeGradients[data.type] || biomeGradients.DEFAULT,
        }}
      />
      <div className="relative pb-32 pt-20">
        {/* Заголовок + большая иконка планеты */}
        <div className="text-center mb-10">
          <div className="text-xl">Your position</div>
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
                    "from-yellow-500 via-black/10 to-orange-500",
                  data.biome === "EXOTIC" &&
                    "from-purple-600 via-pink-600 to-indigo-700",
                )}
              >
                <PlanetIcon biome={data.type} size={240} />
              </div>
            </div>
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-widest px-4 ">
            {data.name}
          </h1>
          <div className="flex items-center justify-center gap-4 mt-3 text-xs">
            <span className="px-2 py-1 rounded-full bg-white/10 border border-white/20">
              {data.type}
            </span>
            <RarityPlanetLabel rarity={data.rarity} />
          </div>
        </div>

        {/* Статистика */}
        <StatisticPlanet
          countResources={data.resources.length}
          seed={data.seed}
          totalAmountResources={totalResources}
        />

        {/* Список ресурсов */}
        <ResourceListPlanet
          isAccessMining={isAccessMining}
          isActive={false}
          resources={data.resources}
        />
      </div>
    </div>
  );
};
