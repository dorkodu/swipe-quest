import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

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
  immer<GameStoreState & GameStoreAction>((_set, _get) => ({
    ...initialState,
  }))
);
