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
        name: "game",
        version: 1,
        migrate(persistedState, version) {
          const state = persistedState as any;

          switch (version) {
            case 0:
              delete state.data.campaign.stage;
              state.data.dailyMissionDate = Date.now();
              state.data.dailyMissions = {
                progressCampaign: { count: 0 },
                progressTower: { count: 0 },
                killMonster: { count: 0 },
                unlockMonster: { count: 0 },
                unlockItem: { count: 0 },
                evolveMonster: { count: 0 },
                upgradeItem: { count: 0 },
                swipeGameEvents: { count: 0 },
                completeAllDailyMissions: { count: 0 },
              };
              state.data.rebirth = {
                points: 0,

                multipliers: {
                  xp: 1,
                  gold: 1,
                  diamond: 1,
                  food: 1,
                  item: 1,
                  monster: 1,
                }
              }
              break;
          }

          return state;
        },
      }
    )
  )
);