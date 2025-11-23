import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useScanNearByPlanets } from "@/api/planet/useScanNearByPlanets.ts";
import { PlanetItem } from "@/modules/Planet/PlanetList/PlanetItem/PlanetItem.tsx";
import { Planet } from "@/api/planet/types.ts";

export const PlanetList = () => {
  const navigate = useNavigate();
  const { data: planets, mutate: scanPlanets } = useScanNearByPlanets();

  useEffect(() => {
    scanPlanets({
      uid: "",
      point: { x: 23, y: 32, z: 98 },
      options: { count: 10, radius: 30 },
    });
  }, []);

  const openPlanetDetails = (planet: Planet) => {
    navigate(`/app/planet/${planet.seed}`);
  };

  console.log({ planets });

  return (
    <div className="p-4 mb-5 w-full">
      <h1 className="text-2xl text-center text-white mb-8 tracking-widest">
        Планеты рядом
      </h1>

      <div className="flex flex-col gap-4 w-full">
        {(planets || []).map((planet) => (
          <PlanetItem
            key={planet.seed}
            planet={planet}
            onClick={() => openPlanetDetails(planet)}
          />
        ))}
      </div>
    </div>
  );
};
