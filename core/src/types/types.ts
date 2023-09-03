import { MonsterId } from "./monster";

export interface IPlayer {
  level: number;
  xp: number;

  gold: number;
  diamond: number;
}

export interface IInventory {
  currentMonsterIndex: number;
  
  monsters: Array<{
    id: MonsterId,
    level: number,
    xp: number,
  }>
}