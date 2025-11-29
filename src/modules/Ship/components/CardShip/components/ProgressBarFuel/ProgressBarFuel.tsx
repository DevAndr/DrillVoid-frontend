import { Fuel } from "lucide-react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { FC } from "react";

import { formatNumberShort } from "@/utils";

interface Props {
  total: number;
  current: number;
  fuelPerUnit: number;
}

export const ProgressBarFuel: FC<Props> = ({ total, current, fuelPerUnit }) => {
  const currentAmountFuel = current / total;

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center text-sm text-gray-300 mb-2">
        <div className="flex gap-1">
          <Fuel size={16} />
          <span>Топливо</span>
        </div>
        <span>
          {formatNumberShort(current)} / {total}
        </span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-3">
        <motion.div
          animate={{ width: `${currentAmountFuel * 100}%` }}
          className={clsx(
            "h-3 rounded-full",
            currentAmountFuel > 0.7
              ? "bg-emerald-500"
              : currentAmountFuel > 0.5
                ? "bg-green-500"
                : currentAmountFuel > 0.4
                  ? "bg-yellow-500"
                  : currentAmountFuel > 0.3
                    ? "bg-amber-500"
                    : currentAmountFuel > 0.2
                      ? "bg-orange-500"
                      : currentAmountFuel > 0.1
                        ? "bg-red-500"
                        : "bg-red-700",
          )}
          initial={{ width: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        />
      </div>
      <div className="text-xs text-gray-400 mt-1">
        Расход: {fuelPerUnit} ед./сек.
      </div>
    </div>
  );
};
