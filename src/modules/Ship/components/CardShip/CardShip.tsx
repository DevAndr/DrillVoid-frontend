import { FC, useState } from "react";
import { motion } from "framer-motion";

import { Ship, TypeShip } from "@/api/ship/types.ts";

interface Props {
  ship: Ship;
}

export const CardShip: FC<Props> = ({ ship }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getShipTypeConfig = (type: TypeShip) => {
    const config: Record<TypeShip, unknown> = {
      STARTER: {
        color: "bg-red-500",
        gradient: "from-red-500 to-red-700",
        icon: "⚔️",
        name: "Истребитель",
      },
      CARGO: {
        color: "bg-green-500",
        gradient: "from-green-500 to-green-700",
        icon: "📦",
        name: "Грузовой",
      },
      BIG_CARGO: {
        color: "bg-purple-500",
        gradient: "from-purple-500 to-purple-700",
        icon: "🚀",
        name: "Линкор",
      },
    };

    return config[type] || config.STARTER;
  };

  const typeConfig = getShipTypeConfig(ship.type);

  // Анимации
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    hover: {
      y: -5,
      boxShadow:
        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { duration: 0.2 },
    },
  };

  const statsVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      animate="visible"
      className={`bg-gray-900 rounded-xl overflow-hidden border-2 ${
        ship.isSelected ? "border-blue-400" : "border-gray-700"
      } cursor-pointer`}
      initial="hidden"
      variants={cardVariants}
      whileHover="hover"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Заголовок с градиентом */}
      <div className={`bg-gradient-to-r ${typeConfig.gradient} p-6`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <motion.div
              className="text-3xl"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              {typeConfig.icon}
            </motion.div>
            <div>
              <h2 className="text-2xl font-bold text-white">
                {typeConfig.name} #{ship.uid.slice(-6)}
              </h2>
              <div className="flex items-center space-x-2 mt-1">
                <span className="bg-black bg-opacity-30 px-2 py-1 rounded-full text-sm text-white">
                  Уровень {ship.level}
                </span>
                <span className="bg-black bg-opacity-30 px-2 py-1 rounded-full text-sm text-white">
                  {ship.isSelected ? "✅ Выбран" : "❌ Не выбран"}
                </span>
              </div>
            </div>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            className="text-white text-2xl"
            transition={{ duration: 0.3 }}
          >
            ▼
          </motion.div>
        </div>
      </div>

      {/* Основная информация */}
      <div className="p-6">
        {/* Индикатор топлива */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-300 mb-2">
            <span>Топливо</span>
            <span>
              {ship.fuel} / {ship.fuelCapacity}
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3">
            <motion.div
              animate={{ width: `${(ship.fuel / ship.fuelCapacity) * 100}%` }}
              className={`h-3 rounded-full ${
                ship.fuel / ship.fuelCapacity > 0.3
                  ? "bg-green-500"
                  : "bg-red-500"
              }`}
              initial={{ width: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            />
          </div>
          <div className="text-xs text-gray-400 mt-1">
            Расход: {ship.fuelPerUnit} ед./сек.
          </div>
        </div>

        {/* Основные характеристики */}
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
          <StatCard
            icon="⛏️"
            label="Добыча"
            unit="ед."
            value={ship.miningPower}
          />
          <StatCard
            icon="📦"
            label="Грузовой отсек"
            unit="ед."
            value={ship.cargoSize}
          />
        </div>

        {/* Расширенная информация */}
        <motion.div
          animate={isExpanded ? "visible" : "hidden"}
          className="overflow-hidden"
          initial="hidden"
          variants={statsVariants}
        >
          <div className="border-t border-gray-700 pt-4">
            <h3 className="text-lg font-semibold text-white mb-3">
              Детали корабля
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <InfoRow label="ID корабля" value={ship.id} />
                <InfoRow label="Локатор" value={ship.locator} />
                <InfoRow
                  label="Создан"
                  value={new Date(ship.createdAt).toLocaleDateString()}
                />
              </div>
              <div className="space-y-2">
                <InfoRow label="ID игры" value={ship.gameDataId} />
                <InfoRow
                  label="Обновлен"
                  value={new Date(ship.updatedAt).toLocaleDateString()}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
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
    className="bg-gray-800 rounded-lg p-3 text-center"
    whileHover={{ scale: 1.05 }}
  >
    <div className="text-2xl mb-1">{icon}</div>
    <div className="text-white font-bold text-lg">
      {value} {unit}
    </div>
    <div className="text-gray-400 text-xs mt-1">{label}</div>
  </motion.div>
);

// Компонент для строки информации
const InfoRow = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <div className="flex justify-between items-center py-1 border-b border-gray-700">
    <span className="text-gray-400">{label}:</span>
    <span className="text-white font-mono text-xs">{value}</span>
  </div>
);
