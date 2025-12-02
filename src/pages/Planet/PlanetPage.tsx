import { useNavigate, useParams } from "react-router-dom";
import { Spinner } from "@heroui/spinner";
import { motion } from "framer-motion";
import clsx from "clsx";
import { ArrowDownToDot, ChevronLeft } from "lucide-react";
import { Button } from "@heroui/button";
import { useEffect } from "react";

import { useGetPlanetBySeed } from "@/api/planet/useGetPlanetBySeed.ts";
import { CenteredLayout } from "@/layouts";
import { isDefined } from "@/utils";
import { biomeGradients } from "@/modules/Planet/PlanetList/PlanetItem/PlanetItem.tsx";
import PlanetIcon from "@/assets/icons/Planet.tsx";
import { RarityPlanetLabel } from "@/modules/Planet/PlanetList/PlanetItem/components/RarityPlanetLabel.tsx";
import { StatisticPlanet } from "@/modules/Planet/PlanetDetails/Statistic/StatisticPlanet.tsx";
import { ResourceListPlanet } from "@/modules/Planet/PlanetDetails/ResourceListPlanet/ResourceListPlanet.tsx";
import { useGameDataState, usePlanetDetailsState } from "@/store/store.ts";
import { useJumpToPlanet } from "@/api/planet/useJumpToPlanet.ts";
import { OwnerPlanet } from "@/modules/Planet/PlanetDetails/OwnerPlanet/OwnerPlanet.tsx";

const PlanetPage = () => {
  const { setSeed } = useGameDataState();
  const { isAccessMining } = usePlanetDetailsState();
  const navigate = useNavigate();
  const { seed } = useParams();
  // @ts-ignore
  const { data, isLoading } = useGetPlanetBySeed({ seed });
  const { mutate: jumpToPlanet } = useJumpToPlanet();

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

  const jumpToPlanetHandler = () => {
    jumpToPlanet(
      {
        uid: "3eece72d-2880-454c-a66e-702b8e84f7df",
        target: data.position,
      },
      {
        onSuccess: (r) => {
          setSeed(r.planet.seed);
          console.log("success", r);
        },
      },
    );
  };

  console.log({ isAccessMining });

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Фон с градиентом биома */}
      <div
        className="fixed inset-0 opacity-50"
        style={{
          backgroundImage:
            biomeGradients[data?.biome || data?.type] || biomeGradients.DEFAULT,
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
      <div className="text-xs text-white/60 mt-2 fixed right-2">
        {data.seed}
      </div>

      <div className="relative pb-32 pt-20">
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
                    "from-yellow-500 via-black/10 to-orange-500",
                  data.biome === "EXOTIC" &&
                    "from-purple-600 via-pink-600 to-indigo-700",
                )}
              >
                <PlanetIcon biome={data.biome || data.type} size={240} />
              </div>
            </div>
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-widest px-4 ">
            {data.name}
          </h1>
          <div className="flex items-center justify-center gap-4 mt-3 text-xs">
            <span className="px-2 py-1 rounded-full bg-white/10 border border-white/20">
              {data.biome || data.type}
            </span>
            <RarityPlanetLabel rarity={data.rarity} />
          </div>
          <OwnerPlanet owner={data.owner} />
        </div>

        {/* Статистика */}
        <StatisticPlanet
          countResources={data.resources.length}
          seed={data.seed}
          totalAmountResources={totalResources}
        />

        {!isAccessMining && (
          <div className="flex w-full justify-center pb-6">
            <Button
              color="primary"
              startContent={<ArrowDownToDot />}
              onPress={jumpToPlanetHandler}
            >
              Приземлиться
            </Button>
          </div>
        )}

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

export default PlanetPage;

export const LegendarySparkles = () => {
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

export const EpicSparkles = () => (
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
