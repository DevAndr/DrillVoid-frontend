import { FC, useState } from "react";
import { motion } from "framer-motion";
import { CircleArrowDown, CircleCheck } from "lucide-react";

import { Ship, TypeShip } from "@/api/ship/types.ts";
import { ProgressBarFuel } from "@/modules/Ship/components/CardShip/components/ProgressBarFuel/ProgressBarFuel.tsx";
import { ShipProperties } from "@/modules/Ship/components/CardShip/components/ShipProperties/ShipProperties.tsx";
import { ExpandDetails } from "@/modules/Ship/components/CardShip/components/ExpandDetails/ExpandDetails.tsx";

// Анимации
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
  hover: {
    y: -5,
    boxShadow:
      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: { duration: 0.2 },
  },
};

const CONFIG: Record<
  TypeShip,
  { color: string; gradient: string; icon: string; name: string }
> = {
  STARTER: {
    color: "bg-red-500",
    gradient: "from-blue-400 to-blue-700",
    icon: "🚀",
    name: "Стартовый",
  },
  CARGO: {
    color: "bg-green-500",
    gradient: "from-green-400 to-green-700",
    icon: "📦",
    name: "Грузовой",
  },
  BIG_CARGO: {
    color: "bg-purple-500",
    gradient: "from-purple-400 to-purple-700",
    icon: "📦",
    name: "Большой грузовой",
  },
};

interface Props {
  ship: Ship;
}

export const CardShip: FC<Props> = ({ ship }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getShipTypeConfig = (type: TypeShip) => {
    return CONFIG[type] || CONFIG.STARTER;
  };

  const typeConfig = getShipTypeConfig(ship.type);

  return (
    <motion.div
      animate="visible"
      className={`bg-white/5 backdrop-blur-xl rounded-xl overflow-hidden cursor-pointer`}
      initial="hidden"
      variants={cardVariants}
      whileHover="hover"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className={`bg-gradient-to-r ${typeConfig.gradient} p-6`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div>
              <h2 className="text-2xl font-bold text-white">
                {typeConfig.name} #{ship.uid.slice(-6)}
              </h2>
              <div className="flex items-center space-x-2 mt-1">
                <span className="bg-black bg-opacity-30 px-2 py-1 rounded-full text-sm text-white">
                  Уровень {ship.level}
                </span>
                <span className="bg-black bg-opacity-30 px-2 py-1 rounded-full text-sm text-white">
                  {ship.isSelected ? (
                    <div className="flex justify-center items-center gap-1">
                      <CircleCheck className="text-emerald-500" size={20} />
                      <span />
                      Выбран
                    </div>
                  ) : (
                    "❌ Не выбран"
                  )}
                </span>
              </div>
            </div>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            className="text-white text-2xl"
            transition={{ duration: 0.3 }}
          >
            <CircleArrowDown />
          </motion.div>
        </div>
      </div>

      <div className="p-6">
        <ProgressBarFuel
          current={ship.fuel}
          fuelPerUnit={ship.fuelPerUnit}
          total={ship.fuelCapacity}
        />

        <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),transparent_50%)]" />

        <ShipProperties ship={ship} />
        <ExpandDetails isExpanded={isExpanded} ship={ship} />
      </div>
    </motion.div>
  );
};
