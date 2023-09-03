import { GameEventId, IGameEvent } from "./types/game_event"
import { IInventory, IPlayer } from "./types/types";

export interface IGameData {
  player: IPlayer;
  inventory: IInventory;

  currentGameEvent: IGameEvent[GameEventId] | undefined;
}

export function createGameData(): IGameData {
  const data: IGameData = {
    player: {
      level: 1,
      xp: 0,

      gold: 0,
      diamond: 0,
    },

    inventory: {

    },

    currentGameEvent: undefined,
  }

  return data;
}