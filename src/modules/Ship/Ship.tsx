import { Spinner } from "@heroui/spinner";
import { motion } from "framer-motion";
import { Button } from "@heroui/button";

import { useGetCurrentShip } from "@/api/ship/useGetCurrentShip.tsx";
import { CenteredLayout } from "@/layouts";
import { CardShip } from "@/modules/Ship/components/CardShip/CardShip.tsx";
import { isDefined } from "@/utils";

export const Ship = () => {
  const { data: ship, isLoading } = useGetCurrentShip();

  if (isLoading) {
    return (
      <CenteredLayout>
        <Spinner />
      </CenteredLayout>
    );
  }

  if (!isDefined(ship)) return null;

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center text-white mb-2"
          initial={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          Панель управления кораблем
        </motion.h1>
        <motion.p
          animate={{ opacity: 1 }}
          className="text-gray-400 text-center mb-8"
          initial={{ opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Нажмите на карточку для просмотра детальной информации
        </motion.p>

        <CardShip ship={ship} />

        {/* Дополнительные элементы управления */}
        <motion.div
          animate={{ opacity: 1 }}
          className="mt-6 flex justify-center space-x-4"
          initial={{ opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
            Выбрать корабль
          </Button>
          <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
            Заправить
          </Button>
        </motion.div>
      </div>
    </div>
  );
};
