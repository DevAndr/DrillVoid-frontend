import { Button } from "@heroui/button";

import { useGameDataState } from "@/store/store.ts";
import { MiningProcess } from "@/modules/Mining/MiningProcess/MiningProcess.tsx";

const MineSlide = () => {
  const { currentGameScreen } = useGameDataState();

  return (
    <div className="w-full">
      <div>
        <Button>Сканировать космос</Button>
      </div>
      {currentGameScreen === "MINING" && <MiningProcess />}
    </div>
  );
};

export default MineSlide;
