import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";

import { IGameData, createGameData } from "@core/gamedata";

export interface GameStoreState {
  data: IGameData
}

export interface GameStoreAction {
  reset: () => void;
}

const initialState: () => GameStoreState = () => ({
  data: createGameData(Date.now()),
})

export const useGameStore = create(
  immer(
    persist<GameStoreState & GameStoreAction>(
      (set, _get) => ({
        ...initialState(),

        reset: () => {
          set(initialState());
        },
      }),
      {
        name: "game"
      }
    )
  )
);