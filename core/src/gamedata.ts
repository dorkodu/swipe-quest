import { GameEventId, IGameEvent } from "./types/game_event"
import { IInventory, IPlayer } from "./types/types";

export interface IGameData {
  seed: number;

  player: IPlayer;
  inventory: IInventory;

  currentGameEvent: IGameEvent[GameEventId] | undefined;
}

export function createGameData(seed: number): IGameData {
  const data: IGameData = {
    seed,

    player: {
      level: 1,
      xp: 0,

      gold: 0,
      diamond: 0,
      food: 0,
    },

    inventory: {
      currentMonsterIndex: 0,

      monsters: [
        { id: "Angel", level: 1, xp: 0 },
      ]
    },

    currentGameEvent: undefined,
  }

  return data;
}