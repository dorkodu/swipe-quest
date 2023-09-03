import { ItemId } from "./item";
import { MonsterId } from "./monster";

export interface IPlayer {
  level: number;
  xp: number;

  gold: number;
  diamond: number;
  food: number;
}

export interface IInventory {
  currentMonsterIndex: number;

  items: { [key in ItemId]?: { id: ItemId, count: number } },

  monsters: Array<{
    id: MonsterId,
    level: number,
    xp: number,
  }>
}