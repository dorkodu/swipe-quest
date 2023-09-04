import { IGameData } from "../gamedata";
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

  const itemToEquip = info.itemId && data.inventory.items[info.itemId];

  const itemToUnequip = monster[info.type];

  // Un-equip the item if exists
  if (itemToUnequip) {
    if (!data.inventory.items[itemToUnequip]) data.inventory.items[itemToUnequip] = { id: itemToUnequip, count: 0 }
    data.inventory.items[itemToUnequip]!.count++;
  }

  // TODO: Fix
  monster[info.type] = itemToEquip ? itemToEquip.id : undefined as any;
  itemToEquip && itemToEquip.count--;

  if (info.itemId && itemToEquip && itemToEquip.count === 0) delete data.inventory.items[info.itemId];
}