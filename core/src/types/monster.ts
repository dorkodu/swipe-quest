import monster from "../data/monster.json";
import { constants } from "./constants";
import { ItemId } from "./item";

export interface IMonster {
  id: MonsterId;
  level: number;

  weapon?: ItemId;
  armor?: ItemId;
  rune?: ItemId;
  ring?: ItemId;
  amulet?: ItemId;
}

export interface IMonsterData {
  _id: number;
  path: string | null;
  baseHp: number;
  baseDmg: number;
  baseSpd: number;
}

export type MonsterId = keyof typeof monster;
export const monsterData: Record<MonsterId, IMonsterData> = {} as any;

// TODO: Fix types
function setData(
  data: Record<any, IMonsterData>,
  source: Record<any, IMonsterData>
) {
  for (const [key, value] of Object.entries(source)) {
    data[key] = {
      ...value,
      baseHp: Math.floor(constants.MONSTER_BASEHP * Math.pow(constants.MONSTER_BASEHP_MODIFIER, value._id)),
      baseDmg: Math.floor(constants.MONSTER_BASEDMG * Math.pow(constants.MONSTER_BASEDMG_MODIFIER, value._id)),
      baseSpd: Math.floor(constants.MONSTER_BASESPD * Math.pow(constants.MONSTER_BASESPD_MODIFIER, value._id)),
    };
  }
}

setData(
  monsterData,
  monster as any,
)