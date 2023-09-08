import { IGameData } from "../gamedata";
import { util } from "../lib/util";
import { IStoreItem } from "../types/store";

export const actionStorePurchase = {
  act,
  actable,
}

type Info = {
  item: IStoreItem
}

function actable(data: IGameData, info: Info): boolean {
  const gold = info.item.cost.gold;
  const diamond = info.item.cost.diamond;

  if (gold !== undefined && gold > data.player.gold) return false;
  if (diamond !== undefined && diamond > data.player.diamond) return false;

  return true;
}

function act(data: IGameData, info: Info) {
  if (!actable(data, info)) return;

  const gold = info.item.cost.gold;
  if (gold !== undefined) { data.player.gold -= gold }

  const diamond = info.item.cost.diamond;
  if (diamond !== undefined) { data.player.diamond -= diamond }

  if (info.item.gold !== undefined) { data.player.gold += info.item.gold }
  if (info.item.food !== undefined) { data.player.food += info.item.food }

  if (info.item.monsterId !== undefined) {
    data.inventory.monsters.push({ id: info.item.monsterId, level: 1 });
    util.sortMonsters(data);
  }

  if (info.item.itemId !== undefined) {
    if (!data.inventory.items[info.item.itemId]) data.inventory.items[info.item.itemId] = { id: info.item.itemId, count: 0 }
    data.inventory.items[info.item.itemId]!.count++;
  }
}