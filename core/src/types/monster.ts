import monster from "../data/monster.json";
import { ItemId } from "./item";

export interface IMonster {
  id: MonsterId;
  level: number;
  xp: number;

  weapon?: ItemId;
  armor?: ItemId;
  rune?: ItemId;
  ring?: ItemId;
  amulet?: ItemId;
}

export interface IMonsterData {
  path: string | null;
  baseHp: number;
  baseDmg: number;
  baseSpd: number;
}

export type MonsterId = keyof typeof monster;
export const monsterData: Record<MonsterId, IMonsterData> = monster;