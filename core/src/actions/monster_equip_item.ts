import { IGameData } from "../gamedata";
import { util } from "../lib/util";
import { ItemId, ItemType } from "../types/item";

export const actionMonsterEquipItem = {
  act,
  actable,
}

type Info = {
  monsterIndex: number,
  itemId: ItemId | undefined,
  type: ItemType,
}

function actable(data: IGameData, info: Info): boolean {
  const monster = data.inventory.monsters[info.monsterIndex];
  if (!monster) return false;

  const item = info.itemId && data.inventory.items[info.itemId];
  if (info.itemId !== undefined && !item) return false;

  if (item && item.count <= 0) return false;

  return true;
}

function act(data: IGameData, info: Info) {
  if (!actable(data, info)) return;

  const monster = data.inventory.monsters[info.monsterIndex];
  if (!monster) return;

  util.equipItem(data, monster, info.itemId, info.type);
}