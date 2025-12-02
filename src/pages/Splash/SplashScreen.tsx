import { Spinner } from "@heroui/spinner";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { CenteredLayout } from "@/layouts";
import { useGetGameData } from "@/api/game-data/useGetGameData.ts";
import { createSeedByPosition } from "@/utils";
import { useGameDataState, usePlanetDetailsState } from "@/store/store.ts";
import { useGetMiningProgressMutation } from "@/api/ship/useGetMiningProgress.ts";
import { TypeGameScreen } from "@/store/gameData.slice.ts";
import { useCurrentUser } from "@/api/user/useCurrentUser.ts";

const SplashScreen = () => {
  const navigate = useNavigate();
  const { setSeed, setCurrentGameScreen, setUsableButtons } =
    useGameDataState();
  const { setIsAccessMining } = usePlanetDetailsState();

  const { mutate: getGameData } = useGetGameData();
  const { mutate: getMiningProgress } = useGetMiningProgressMutation();
  const { mutate: getCurrentUser } = useCurrentUser();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      await new Promise((resolve) => {
        getCurrentUser(undefined, {
          onSuccess: () => {
            getGameData(undefined, {
              onSuccess: (resp) => {
                const seed = createSeedByPosition(resp.x, resp.y, resp.z);

                setSeed(seed);
                setCurrentGameScreen(TypeGameScreen.CURRENT_PLANET);

                getMiningProgress(
                  {},
                  {
                    onSuccess: () => {
                      setCurrentGameScreen(TypeGameScreen.MINING);
                      setUsableButtons(false);
                    },
                    onError: () => {
                      setIsAccessMining(true);
                    },
                    onSettled: () => {
                      setTimeout(() => {
                        setIsLoading(false);
                        resolve(1);
                        navigate("/app/slides/mine");
                      }, 3000);
                    },
                  },
                );
              },
            });
          },
        });
      });
    };

    load();
  }, []);

  return (
    <CenteredLayout>
      <div className="flex items-center flex-col gap-10">
        <h1 className="text-4xl text-balance font-bold">Drill Void</h1>
        {isLoading && <Spinner size="sm" />}
      </div>
    </CenteredLayout>
  );
};

export default SplashScreen;
