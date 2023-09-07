import { IGameData } from "../gamedata";
import { util } from "../lib/util";
import { MonsterFightType } from "../types/monster_fight";
import { actionMonsterFight } from "./monster_fight";

export const actionTowerFight = {
  act,
  actable,
}

type Info = {
  tower: ReturnType<typeof util.getTowerLevel>,
}

function actable(_data: IGameData, _info: Info): boolean {
  return true;
}

function act(data: IGameData, info: Info) {
  if (!actable(data, info)) return;

  const enemy = info.tower.monster;
  const ally = data.inventory.monsters[data.inventory.currentMonsterIndex];
  if (!ally) return;

  actionMonsterFight.act(
    data,
    {
      phase: "start",
      type: MonsterFightType.Tower,
      rewards: info.tower.rewards,
      ally,
      enemy
    }
  );
}