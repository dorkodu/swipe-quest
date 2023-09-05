import monster from "../data/monster.json";
import { AmuletId, ArmorId, RingId, RuneId, WeaponId } from "./item";

export interface IMonster {
  id: MonsterId;
  level: number;
  xp: number;

  weapon?: WeaponId;
  armor?: ArmorId;
  rune?: RuneId;
  ring?: RingId;
  amulet?: AmuletId;
}

export interface IMonsterData {
  path: string | null;
  baseHp: number;
  baseDmg: number;
  baseSpd: number;
}

export type MonsterId = keyof typeof monster;
export const monsterData: Record<MonsterId, IMonsterData> = monster;