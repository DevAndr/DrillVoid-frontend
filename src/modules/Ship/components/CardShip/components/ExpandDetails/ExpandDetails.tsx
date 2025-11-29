import { FC } from "react";
import { motion } from "framer-motion";

import { Ship } from "@/api/ship/types.ts";

const statsVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    transition: { duration: 0.4, ease: "easeInOut" as const },
  },
};

interface Props {
  ship: Ship;
  isExpanded?: boolean;
}

export const ExpandDetails: FC<Props> = ({ ship, isExpanded }) => {
  return (
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
  );
};

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
