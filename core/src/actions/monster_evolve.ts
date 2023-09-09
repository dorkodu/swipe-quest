import { IGameData } from "../gamedata";
import { signals } from "../lib/signals";
import { util } from "../lib/util";
import { ItemType } from "../types/item";

export const actionMonsterEvolve = {
  act,
  actable,
}

type Info = {
  monsters: (number | undefined)[]
}

function actable(data: IGameData, info: Info): boolean {
  const evolvedMonster = util.getMonsterEvolve(data, info.monsters);
  if (!evolvedMonster) return false;

  return true;
}

function act(data: IGameData, info: Info) {
  if (!actable(data, info)) return;

  const evolvedMonster = util.getMonsterEvolve(data, info.monsters);
  if (!evolvedMonster) return;

  // Un-equip all the items of the monsters that are being evolved
  info.monsters.forEach(m => {
    const monster = m !== undefined && data.inventory.monsters[m];
    if (!monster) return;
    util.equipItem(data, monster, undefined, ItemType.Weapon);
    util.equipItem(data, monster, undefined, ItemType.Armor);
    util.equipItem(data, monster, undefined, ItemType.Rune);
    util.equipItem(data, monster, undefined, ItemType.Ring);
    util.equipItem(data, monster, undefined, ItemType.Amulet);
  });

  // Remove monsters that are being evolved
  [...info.monsters]
    .sort((a, b) => a !== undefined && b !== undefined ? b - a : 0)
    .forEach(i => i !== undefined && data.inventory.monsters.splice(i, 1));

  // Add the monster that is evolved to inventory
  data.inventory.monsters.push(evolvedMonster);

  util.sortMonsters(data);
  
  signals.evolveMonster.dispatch({ data });
}