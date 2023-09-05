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