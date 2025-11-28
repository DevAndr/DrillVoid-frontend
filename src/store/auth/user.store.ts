import { createStore, useStore } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { persistedUserSlice, UserSlice } from "@/store/auth/user.slice.ts";

export type UserStoreState = UserSlice;

export const userStore = createStore<UserStoreState>()(
  devtools(
    immer((...args) => ({
      ...persistedUserSlice(...args),
    })),
    {
      name: "UserStore",
    },
  ),
);

export const useUserDataState = () => useStore(userStore, (s) => s.userState);
