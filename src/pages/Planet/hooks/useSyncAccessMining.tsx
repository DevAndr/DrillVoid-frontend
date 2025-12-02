import { useEffect } from "react";

import { useGameDataState, usePlanetDetailsState } from "@/store/store.ts";

export const useSyncAccessMining = (currenSeed: string) => {
  const { seed: seedSave } = useGameDataState();
  const { setIsAccessMining } = usePlanetDetailsState();

  useEffect(() => {
    if (currenSeed !== seedSave) {
      setIsAccessMining(false);
    }
  }, [seedSave, currenSeed]);
};
