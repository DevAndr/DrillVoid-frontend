import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@heroui/button";
import { ChevronLeft } from "lucide-react";
import { Spinner } from "@heroui/spinner";

import { useGetPlanetBySeed } from "@/api/planet/useGetPlanetBySeed.ts";
import { CenteredLayout } from "@/layouts";
import { RarityPlanetLabel } from "@/modules/Planet/PlanetList/PlanetItem/components/RarityPlanetLabel.tsx";
import { isDefined } from "@/utils";
import PlanetIcon from "@/assets/icons/Planet.tsx";
import { ResourcePlanetItem } from "@/modules/Planet/PlanetDetails/ResourcePlanetItem.tsx";

const PlanetPage = () => {
  const navigate = useNavigate();
  const { seed } = useParams();
  const { data, isLoading } = useGetPlanetBySeed({ seed });

  const backHandle = () => {
    navigate(-1);
  };

  if (isLoading) {
    return (
      <CenteredLayout>
        <Spinner />
      </CenteredLayout>
    );
  }

  if (!isDefined(data)) return null;

  return (
    <div className="p-4">
      <div className="flex items-center  w-full gap-4">
        <Button isIconOnly onPress={backHandle}>
          <ChevronLeft />
        </Button>
        <h1 className="text-2xl text-center font-bold tracking-wider">
          {data.name}
        </h1>
      </div>
      <div className="flex w-full justify-between">
        <div className="text-xs">
          <div className="text-xs">Координаты</div>
          <div className="text-amber-200">{data.seed}</div>
        </div>
        <RarityPlanetLabel rarity={data.rarity} />
      </div>
      <div className="flex items-center justify-center">
        <PlanetIcon biome={data.biome} size={240} />
      </div>

      <div className="flex flex-col gap-4">
        {(data.resources || []).map((res) => (
          <ResourcePlanetItem key={res.type} resource={res} />
        ))}
      </div>
    </div>
  );
};

export default PlanetPage;
