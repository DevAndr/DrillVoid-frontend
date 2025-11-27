import { createStore } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { useStore } from "zustand/react";

import {
  GameDataState,
  persistOptionsGameData,
  scheduleDataSlice,
} from "@/store/gameDataSlice.ts";
import {
  planetDetailSlice,
  PlanetDetailState,
} from "@/store/planetDetailSlice.ts";

export type BoundState = GameDataState & PlanetDetailState;

export const store = createStore<BoundState>()(
  devtools(
    persist(
      immer((...args) => ({
        ...scheduleDataSlice(...args),
        ...planetDetailSlice(...args),
      })),
      persistOptionsGameData(),
    ),
    {
      name: "ScheduleStringsStore",
    },
  ),
);

export const useGameDataState = () => useStore(store, (s) => s.gameDataState);
export const usePlanetDetailsState = () =>
  useStore(store, (s) => s.planetDetailsState);
