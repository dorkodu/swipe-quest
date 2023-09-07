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
      baseHp: value._id * constants.MONSTER_BASEHP * constants.MONSTER_BASEHP_MODIFIER,
      baseDmg: value._id * constants.MONSTER_BASEDMG * constants.MONSTER_BASEDMG_MODIFIER,
      baseSpd: value._id * constants.MONSTER_BASESPD * constants.MONSTER_BASESPD_MODIFIER,
    };
  }
}

setData(
  monsterData,
  monster as any,
)