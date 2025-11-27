import { StateCreator } from "zustand/vanilla";

import { BoundState } from "@/store/store.ts";

export enum TypeGameScreen {
  MINING = "MINING",
  PLANET_NEAR_BY = "PLANET_NEAR_BY",
  RESOURCES = "RESOURCES",
  SHIP = "SHIP",
  CURRENT_PLANET = "CURRENT_PLANET",
}

export interface GameDataState {
  gameDataState: {
    isMining: boolean;
    currentGameScreen: TypeGameScreen;
    seed: string | null;

    setIsMining: (value: boolean) => void;
    setCurrentGameScreen: (value: TypeGameScreen) => void;
    setSeed: (value: string) => void;
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
    currentGameScreen: TypeGameScreen.MINING,
    seed: null,
    setIsMining: (value: boolean) =>
      set((state) => {
        state.gameDataState.isMining = value;
      }),
    setCurrentGameScreen: (value) => {
      set((state) => {
        state.gameDataState.currentGameScreen = value;
      });
    },
    setSeed: (value) => {
      set((state) => {
        state.gameDataState.seed = value;
      });
    },
  },
});

export const persistOptionsGameData = () => ({
  name: "GameDataStore",
  partialize: (state: BoundState) => ({
    gameDataState: {
      currentGameScreen: state.gameDataState.currentGameScreen,
      seed: state.gameDataState.seed,
    },
  }),
  merge: (persistedState: unknown, currentState: BoundState) => {
    const typedPersistedState = persistedState as GameDataState;

    return {
      ...currentState,
      gameDataState: {
        ...currentState.gameDataState,
        currentGameScreen: typedPersistedState.gameDataState?.currentGameScreen,
        seed: typedPersistedState.gameDataState?.seed,
      },
    };
  },
});
