import { Button } from "@heroui/button";
import { Boxes, Drone, MapPin, Search } from "lucide-react";

import { useGameDataState } from "@/store/store.ts";
import { MiningProcess } from "@/modules/Mining/MiningProcess/MiningProcess.tsx";
import { TypeGameScreen } from "@/store/gameData.slice.ts";
import { PlanetList } from "@/modules/Planet/PlanetList/PlanetList.tsx";
import { Resources } from "@/modules/Resources/Resources.tsx";
import { Ship } from "@/modules/Ship/Ship.tsx";
import { CurrentPlanet } from "@/modules/Planet/CurrentPlanet/CurrentPlanet.tsx";

const MineSlide = () => {
  const { currentGameScreen, setCurrentGameScreen } = useGameDataState();

  const scanPlanetsHandler = () => {
    setCurrentGameScreen(TypeGameScreen.PLANET_NEAR_BY);
  };

  const resourcesHandler = () => {
    setCurrentGameScreen(TypeGameScreen.RESOURCES);
  };

  const shipHandler = () => {
    setCurrentGameScreen(TypeGameScreen.SHIP);
  };

  const currentPlanetHandler = () => {
    setCurrentGameScreen(TypeGameScreen.CURRENT_PLANET);
  };

  return (
    <div className="w-full">
      <div className="flex gap-4 flex-wrap">
        <Button
          isIconOnly
          color="primary"
          startContent={<Search />}
          onPress={scanPlanetsHandler}
        >
          {/*Scan planets*/}
        </Button>
        <Button
          isIconOnly
          color="primary"
          startContent={<Boxes />}
          onPress={resourcesHandler}
        >
          {/*Resources*/}
        </Button>
        <Button
          isIconOnly
          color="primary"
          startContent={<Drone />}
          onPress={shipHandler}
        >
          {/*Ship*/}
        </Button>
        <Button
          isIconOnly
          color="primary"
          startContent={<MapPin />}
          onPress={currentPlanetHandler}
        >
          {/*Current planet*/}
        </Button>
      </div>
      {currentGameScreen === TypeGameScreen.MINING && <MiningProcess />}
      {currentGameScreen === TypeGameScreen.PLANET_NEAR_BY && <PlanetList />}
      {currentGameScreen === TypeGameScreen.RESOURCES && <Resources />}
      {currentGameScreen === TypeGameScreen.SHIP && <Ship />}
      {currentGameScreen === TypeGameScreen.CURRENT_PLANET && <CurrentPlanet />}
    </div>
  );
};

export default MineSlide;
