import { StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { User } from "@/api/user/types.ts";
import { UserStoreState } from "@/store/auth/user.store.ts";

export interface UserSlice {
  userState: {
    user: User | null;
    setUser: (user: unknown) => void;
  };
}

const createUserSlice: StateCreator<
  UserStoreState,
  [
    ["zustand/devtools", never],
    ["zustand/immer", never],
    ["zustand/persist", unknown],
  ],
  [],
  UserSlice
> = (set) => ({
  userState: {
    user: null,
    setUser: (user) =>
      set((state) => ({
        userState: {
          ...state.userState,
          user,
        },
      })),
  },
});

export const persistedUserSlice = devtools(
  persist(createUserSlice, {
    name: "user-storage", // ключ в localStorage
    partialize: (state) => ({
      userState: { user: state.userState.user },
    }),
    merge: (persistedState, currentState) => {
      const typedPersistedState = persistedState as UserSlice;

      return {
        ...currentState,
        userState: {
          ...currentState.userState,
          user: typedPersistedState.userState.user,
        },
      };
    },
  }),
  { name: "UserSlice" }, // название в devtools
);
