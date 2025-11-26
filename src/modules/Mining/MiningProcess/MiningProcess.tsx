import { motion } from "framer-motion";
import { Pickaxe, Zap } from "lucide-react";

const rarityConfig = {
  COMMON: {
    color: "gray",
    glow: "shadow-gray-500/30",
    gradient: "from-gray-400 to-gray-600",
  },
  UNCOMMON: {
    color: "blue",
    glow: "shadow-blue-500/50",
    gradient: "from-blue-400 to-cyan-600",
  },
  RARE: {
    color: "purple",
    glow: "shadow-purple-500/60",
    gradient: "from-purple-400 to-pink-600",
  },
  EPIC: {
    color: "pink",
    glow: "shadow-pink-500/80",
    gradient: "from-pink-500 to-purple-700",
  },
  LEGENDARY: {
    color: "yellow",
    glow: "shadow-yellow-400/90",
    gradient: "from-yellow-400 via-orange-500 to-red-600",
  },
};

export const MiningProcess = () => {
  const config = rarityConfig["LEGENDARY"];
  const progress = (100_000 / 150_000) * 100;
  const resourceRarity = "LEGENDARY";
  const textGlowClass = {
    COMMON: "drop-shadow-[0_0_8px_rgba(156,163,175,0.8)]",
    UNCOMMON: "drop-shadow-[0_0_12px_rgba(34,211,238,0.9)]",
    RARE: "drop-shadow-[0_0_16px_rgba(168,85,247,0.9)]",
    EPIC: "drop-shadow-[0_0_20px_rgba(236,72,153,1)]",
    LEGENDARY:
      "drop-shadow-[0_0_24px_#fbbf24] drop-shadow-[0_0_48px_#f59e0b] drop-shadow-[0_0_72px_#ea580c]",
  }[resourceRarity];

  return (
    <div className="bg-black text-white overflow-hidden relative">
      {/* Космический фон */}
      <div className="inset-0 bg-gradient-to-b from-purple-950 via-black to-black opacity-90" />
      <div className="inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),transparent_50%)]" />
      </div>

      <div className="relative pt-20 px-6 pb-32">
        {/* Название планеты */}
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
        >
          <h1
            className={`
              text-5xl md:text-6xl font-black tracking-wider
              bg-gradient-to-r ${config.gradient} bg-clip-text text-transparent
              ${textGlowClass} 
            `}
            style={{
              filter: "drop-shadow(0 0 20px rgba(255,255,255,0.3))",
            }}
          >
            Neuetron prime
          </h1>
          <p className="text-gray-400 mt-2">
            {"Toxic"} • {resourceRarity} • Active Mining
          </p>
        </motion.div>

        {/* Прогресс добычи */}
        <div className="max-w-lg mx-auto space-y-6">
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl">{"OBSIDIAN"}</span>
              <span className="text-3xl font-bold font-mono">{100_000}</span>
            </div>

            <div className="relative h-12 bg-black/40 rounded-full overflow-hidden border border-white/20">
              <motion.div
                animate={{ width: `${progress}%` }}
                className={`absolute inset-y-0 left-0 bg-gradient-to-r ${config.gradient}`}
                initial={{ width: 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
              <MiningBarParticles progress={progress} rarity={resourceRarity} />
              <div className="absolute inset-0 flex items-center justify-center font-bold">
                {progress.toFixed(1)}%
              </div>
            </div>
          </div>

          {/* Скорость и бонусы */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-5 text-center border border-white/10">
              <Zap className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
              <div className="text-3xl font-bold font-mono text-green-400">
                +{125}
              </div>
              <div className="text-gray-400 text-sm">per second</div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-5 text-center border border-white/10">
              <Pickaxe className="w-8 h-8 mx-auto mb-2 text-cyan-400" />
              <div className="text-3xl font-bold font-mono">
                {(150_000 / 125 / 3600).toFixed(1)}
              </div>
              <div className="text-gray-400 text-sm">hours left</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// MiningBarParticles — МАЛЕНЬКИЕ, ЧЁТКИЕ, ИДЕАЛЬНЫЕ кружочки
// MiningBarParticles — ДОЖДЬ ИЗ РЕСУРСОВ (сверху вниз!)
const MiningBarParticles = ({
  rarity,
  progress,
}: {
  rarity: string;
  progress: number;
}) => {
  const colors = {
    COMMON: "bg-gray-200",
    UNCOMMON: "bg-cyan-300",
    RARE: "bg-purple-300",
    EPIC: "bg-pink-300",
    LEGENDARY: "bg-yellow-200",
  };

  const color = colors[rarity as keyof typeof colors] || "bg-white";

  const count =
    rarity === "LEGENDARY"
      ? 100
      : rarity === "EPIC"
        ? 90
        : rarity === "RARE"
          ? 80
          : rarity === "UNCOMMON"
            ? 70
            : 65;

  return (
    <>
      {[...Array(count)].map((_, i) => {
        const xPos = (i / count) * 110;

        if (xPos > progress + 15) return null;

        const size =
          rarity === "LEGENDARY"
            ? 4 + Math.random() * 6
            : rarity === "EPIC"
              ? 3 + Math.random() * 5
              : rarity === "RARE"
                ? 3 + Math.random() * 4
                : 2 + Math.random() * 4;

        const delay = Math.random() * 1.5;
        const duration = 1.8 + Math.random() * 1.2;

        return (
          <motion.div
            key={i}
            animate={{
              y: 180, // падают вниз через весь бар
              opacity: [0, 1, 0.9, 0.6, 0],
              scale: [0.3, 1.3, 1.1, 0.9],
            }}
            className={`absolute ${color} rounded-full shadow-2xl`}
            initial={{ y: -50, opacity: 0, scale: 0.3 }}
            style={{
              width: size,
              height: size,
              left: `${xPos + (Math.random() - 0.5) * 20}%`,
              // Стартуют сверху бара (за пределами)
              top: "-20px",
              boxShadow:
                rarity === "LEGENDARY"
                  ? `0 0 ${size * 4}px #fbbf24, 0 0 ${size * 8}px #f59e0b`
                  : rarity === "EPIC"
                    ? `0 0 ${size * 4}px #ec4899, 0 0 ${size * 7}px #d946ef`
                    : `0 0 ${size * 3}px currentColor`,
            }}
            transition={{
              duration,
              repeat: Infinity,
              delay,
              ease: "easeIn",
            }}
          />
        );
      })}
    </>
  );
};
