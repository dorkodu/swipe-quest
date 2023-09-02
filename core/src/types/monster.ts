import monster from "../data/monster.json";

export interface IMonster {
  path: string | null;
  baseHp: number;
  baseDmg: number;
  baseSpd: number;
}

export type MonsterId = keyof typeof monster;
export const monsterData: Record<MonsterId, IMonster> = monster;