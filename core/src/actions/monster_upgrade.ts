import { IGameData } from "../gamedata";
import { util } from "../lib/util";

export const actionMonsterUpgrade = {
  act,
  actable,
}

type Info = {
  monsterIndex: number,
}

function actable(data: IGameData, info: Info): boolean {
  const monster = data.inventory.monsters[info.monsterIndex];
  if (!monster) return false;

  const cost = util.getMonsterUpgradeCost(monster.level);

  if (cost.gold > data.player.gold) return false;
  if (cost.food > data.player.food) return false;

  return true;
}

function act(data: IGameData, info: Info) {
  if (!actable(data, info)) return;

  const monster = data.inventory.monsters[info.monsterIndex];
  if (!monster) return;

  const cost = util.getMonsterUpgradeCost(monster.level);

  data.player.gold -= cost.gold;
  data.player.food -= cost.food;
  monster.level++;
}