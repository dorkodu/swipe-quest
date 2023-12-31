import { IDailyMissions } from "./types/daily_missions";
import { GameEventId, IGameEvent } from "./types/game_event"
import { IMonsterFight } from "./types/monster_fight";
import { IRebirth } from "./types/rebirth";
import { ICampaign, IInventory, IPlayer, ITower } from "./types/types";

export interface IGameData {
  seed: number;

  player: IPlayer;
  inventory: IInventory;

  campaign: ICampaign;
  tower: ITower;

  dailyMissions: IDailyMissions;
  dailyMissionDate: number;

  rebirth: IRebirth;

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

      items: {
        "Legendary Ancient Sword": { id: "Legendary Ancient Sword", count: 1 },
        "Legendary Animal Skin 1 Armor": { id: "Legendary Animal Skin 1 Armor", count: 1 },
        "Legendary Generic Rune": { id: "Legendary Generic Rune", count: 1 },
        "Legendary Agate Ring": { id: "Legendary Agate Ring", count: 1 },
        "Legendary Bone Gray Amulet": { id: "Legendary Bone Gray Amulet", count: 1 },
      },

      monsters: [
        { id: "Angel", level: 1 },
      ]
    },

    campaign: { level: 1 },
    tower: { level: 1 },

    dailyMissions: {
      progressCampaign: { count: 0 },
      progressTower: { count: 0 },
      killMonster: { count: 0 },
      unlockMonster: { count: 0 },
      unlockItem: { count: 0 },
      evolveMonster: { count: 0 },
      upgradeItem: { count: 0 },
      swipeGameEvents: { count: 0 },
      completeAllDailyMissions: { count: 0 },
    },
    dailyMissionDate: Date.now(),

    rebirth: {
      points: 0,

      multipliers: {
        xp: 1,
        gold: 1,
        diamond: 1,
        food: 1,
        item: 1,
        monster: 1,
      }
    },

    currentGameEvent: undefined,
    currentMonsterFight: undefined,
  }

  return data;
}