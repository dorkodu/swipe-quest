import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";

import { IGameData, createGameData } from "@core/gamedata";

export interface GameStoreState {
  data: IGameData
}

export interface GameStoreAction {

}

const initialState: GameStoreState = {
  data: createGameData(Date.now()),
}

export const useGameStore = create(
  immer(
    persist<GameStoreState & GameStoreAction>(
      (_set, _get) => ({
        ...initialState,
      }),
      {
        name: "game"
      }
    )
  )
);