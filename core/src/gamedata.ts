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
      currentMonsterIndex: 0,

      monsters: [
        { id: "Angel", level: 1, xp: 0 },
        { id: "Deep Dwarf", level: 12, xp: 0 },
        { id: "Freed Slave", level: 13, xp: 0 },
        { id: "Jelly", level: 14, xp: 0 },
        { id: "Phoenix", level: 15, xp: 0 },
        { id: "Stone Giant", level: 16, xp: 0 },
      ]
    },

    currentGameEvent: undefined,
  }

  return data;
}