import { IGameData } from "../gamedata";
import { signals } from "../lib/signals";
import { util } from "../lib/util";
import { ItemId } from "../types/item";

export const actionItemUpgrade = {
  act,
  actable,
}

type Info = {
  itemId: ItemId | undefined
}

function actable(data: IGameData, info: Info): boolean {
  if (!info.itemId) return false;

  const item = data.inventory.items[info.itemId];
  if (!item) return false;

  if (item.count < 3) return false;

  const upgradedId = util.getItemUpgrade(info.itemId);
  if (!upgradedId) return false;

  return true;
}

function act(data: IGameData, info: Info) {
  if (!actable(data, info)) return;

  if (!info.itemId) return;

  const item = data.inventory.items[info.itemId];
  if (!item) return;

  const upgradedId = util.getItemUpgrade(info.itemId);
  if (!upgradedId) return;

  if (!data.inventory.items[upgradedId]) data.inventory.items[upgradedId] = { id: upgradedId, count: 0 }
  data.inventory.items[upgradedId]!.count++;

  item.count -= 3;

  if (item.count === 0) delete data.inventory.items[info.itemId];

  signals.upgradeItem.dispatch({ data });
}