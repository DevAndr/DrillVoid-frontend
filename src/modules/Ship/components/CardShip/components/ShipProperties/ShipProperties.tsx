import { FC } from "react";
import { motion } from "framer-motion";

import { Ship } from "@/api/ship/types.ts";

interface Props {
  ship: Ship;
}

export const ShipProperties: FC<Props> = ({ ship }) => {
  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <StatCard
        icon="🚀"
        label="Скорость варпа"
        unit="ед."
        value={ship.warpSpeed}
      />
      <StatCard
        icon="🌌"
        label="Дальность варпа"
        unit="св.л."
        value={ship.warpRange}
      />
      <StatCard icon="⛏️" label="Добыча" unit="ед." value={ship.miningPower} />
      <StatCard
        icon="📦"
        label="Грузовой отсек"
        unit="ед."
        value={ship.cargoSize}
      />
    </div>
  );
};

// Компонент для отображения статистики
const StatCard = ({
  label,
  value,
  unit,
  icon,
}: {
  label: string;
  value: number;
  unit: string;
  icon: string;
}) => (
  <motion.div
    className="bg-white/5 backdrop-blur-xl rounded-2xl p-3 text-center border border-white/10 shadow-xl shadow-white/5"
    whileHover={{ scale: 1.05 }}
  >
    <div className="text-2xl mb-1">{icon}</div>
    <div className="text-white font-bold text-lg">
      {value} {unit}
    </div>
    <div className="text-gray-400 text-xs mt-1">{label}</div>
  </motion.div>
);
