import { StateCreator } from "zustand/vanilla";

import { BoundState } from "@/store/store.ts";

export interface GameDataState {
  gameDataState: {
    isMining: boolean;
    currentGameScreen: "MINING" | "PLANET_NEAR_BY" | "RESOURCES";

    setIsMining: (value: boolean) => void;
  };
}

export const scheduleDataSlice: StateCreator<
  BoundState,
  [["zustand/devtools", never], ["zustand/immer", never]],
  [],
  GameDataState
> = (set) => ({
  gameDataState: {
    isMining: false,
    currentGameScreen: "MINING",
    setIsMining: (value: boolean) =>
      set((state) => {
        state.gameDataState.isMining = value;
      }),
  },
});
