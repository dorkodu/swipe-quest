import { GameEventId, IGameEvent } from "./types/game_event"
import { IInventory } from "./types/inventory";
import { IPlayer } from "./types/player";

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
      diamonds: 0,
    },

    inventory: {

    },

    currentGameEvent: undefined,
  }

  return data;
}