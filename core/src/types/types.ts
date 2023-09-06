import { IItem, ItemId } from "./item";
import { IMonster } from "./monster";

export interface IPlayer {
  level: number;
  xp: number;

  gold: number;
  diamond: number;
  food: number;
}

export interface IInventory {
  currentMonsterIndex: number;

  items: { [key in ItemId]?: IItem },
  monsters: Array<IMonster>
}

export interface ICampaign {
  stage: "easy" | "normal" | "hard" | "expert" | "hell";
  level: number;
}

export interface ITower {
  level: number;
}

export interface IRewards {
  xp?: number;
  gold?: number;
  diamond?: number;
  food?: number;
  items?: IItem[];
  monsters?: IMonster[];
}