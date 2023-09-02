import { IMonster } from "../types/monster";
import { MonsterId } from "../types/monster_id";

export const monsterData: Record<Exclude<MonsterId, MonsterId.None>, IMonster> = {
  [MonsterId.Angel]: {
    name: MonsterId.Angel,
    baseHp: 1,
    baseDmg: 1,
    baseSpd: 1,
  },

  [MonsterId.DeathKnight]: {
    name: MonsterId.DeathKnight,
    baseHp: 1,
    baseDmg: 1,
    baseSpd: 1,
  },

  [MonsterId.DeepDwarf]: {
    name: MonsterId.DeepDwarf,
    baseHp: 1,
    baseDmg: 1,
    baseSpd: 1,
  },

  [MonsterId.Jelly]: {
    name: MonsterId.Jelly,
    baseHp: 1,
    baseDmg: 1,
    baseSpd: 1,
  },

  [MonsterId.Ogre]: {
    name: MonsterId.Ogre,
    baseHp: 1,
    baseDmg: 1,
    baseSpd: 1,
  },

  [MonsterId.Phoenix]: {
    name: MonsterId.Phoenix,
    baseHp: 1,
    baseDmg: 1,
    baseSpd: 1,
  },

  [MonsterId.Raven]: {
    name: MonsterId.Raven,
    baseHp: 1,
    baseDmg: 1,
    baseSpd: 1,
  },

  [MonsterId.FreedSlave]: {
    name: MonsterId.FreedSlave,
    baseHp: 1,
    baseDmg: 1,
    baseSpd: 1,
  },

  [MonsterId.StoneGiant]: {
    name: MonsterId.StoneGiant,
    baseHp: 1,
    baseDmg: 1,
    baseSpd: 1,
  },

  [MonsterId.Wizard]: {
    name: MonsterId.Wizard,
    baseHp: 1,
    baseDmg: 1,
    baseSpd: 1,
  },
}