import { IGameData } from "../gamedata";
import { ItemId } from "../types/item";

export const actionMonsterEquipItem = {
  act,
  actable,
}

type Info = {
  monsterIndex: number,
  itemId: ItemId,
  slot: "weapon" | "armor" | "rune" | "ring" | "amulet"
}

function actable(data: IGameData, info: Info): boolean {
  const monster = data.inventory.monsters[info.monsterIndex];
  if (!monster) return false;

  const item = data.inventory.items[info.itemId];
  if (!item) return false;

  if (item.count <= 0) return false;

  return true;
}

function act(data: IGameData, info: Info) {
  if (!actable(data, info)) return;

  const monster = data.inventory.monsters[info.monsterIndex];
  if (!monster) return;

  const itemToEquip = data.inventory.items[info.itemId];
  if (!itemToEquip) return;

  const itemToUnequip = monster[info.slot];

  // Un-equip the item if exists
  if (itemToUnequip) {
    if (!data.inventory.items[itemToUnequip]) data.inventory.items[itemToUnequip] = { id: itemToUnequip, count: 0 }
    data.inventory.items[itemToUnequip]!.count++;
  }

  // TODO: Fix
  monster[info.slot] = itemToEquip.id as any;
  itemToEquip.count--;

  if (itemToEquip.count === 0) delete data.inventory.items[info.itemId];
}