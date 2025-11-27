import { StateCreator } from "zustand/vanilla";

import { BoundState } from "@/store/store.ts";

export interface PlanetDetailState {
  planetDetailsState: {
    isAccessMining: boolean;
    setIsAccessMining: (value: boolean) => void;
  };
}

export const planetDetailSlice: StateCreator<
  BoundState,
  [["zustand/devtools", never], ["zustand/immer", never]],
  [],
  PlanetDetailState
> = (set) => ({
  planetDetailsState: {
    isAccessMining: false,
    setIsAccessMining: (value: boolean) =>
      set((state) => {
        state.planetDetailsState.isAccessMining = value;
      }),
  },
});
