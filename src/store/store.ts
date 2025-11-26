import { createStore } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { useStore } from "zustand/react";

import { GameDataState, scheduleDataSlice } from "@/store/gameDataSlice.ts";

export type BoundState = GameDataState;

export const store = createStore<BoundState>()(
  devtools(
    immer((...args) => ({
      ...scheduleDataSlice(...args),
    })),
    {
      name: "ScheduleStringsStore",
    },
  ),
);

export const useGameDataState = () => useStore(store, (s) => s.gameDataState);
