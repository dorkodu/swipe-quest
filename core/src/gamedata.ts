import { GameEventId, IGameEvent } from "./types/game_event"
import { IMonsterFight } from "./types/monster_fight";
import { ICampaign, IInventory, IPlayer, ITower } from "./types/types";

export interface IGameData {
  seed: number;

  player: IPlayer;
  inventory: IInventory;

  campaign: ICampaign;
  tower: ITower;

  currentGameEvent: IGameEvent[GameEventId] | undefined;
  currentMonsterFight: IMonsterFight | undefined;
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

      items: {},

      monsters: [
        { id: "Angel", level: 1 },
      ]
    },

    campaign: { stage: "easy", level: 1 },
    tower: { level: 1 },

    currentGameEvent: undefined,
    currentMonsterFight: undefined,
  }

  return data;
}