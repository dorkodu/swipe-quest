import { useAppStore } from "@/stores/appStore";
import { IItem } from "@core/types/item";
import { IMonster } from "@core/types/monster";

export function wait<T>(
  start: () => Promise<T>,
  before: number = 100,
  after: number = 500
): () => Promise<T> {
  let out: T;

  return () => new Promise(async (resolve) => {
    let didBefore = false;
    let didAfter = false;
    let loaded = false;

    setTimeout(() => {
      if (loaded) resolve(out);
      didBefore = true;
    }, before);

    setTimeout(() => {
      if (loaded) resolve(out);
      didAfter = true;
    }, after);

    out = await start();

    if (!didBefore || didAfter) resolve(out);
    loaded = true;
  })
}

function formatNumber(number: number, long?: boolean) {
  number = Math.floor(number);
  if (long) return Intl.NumberFormat("en").format(number);
  return Intl.NumberFormat("en", { notation: "compact" }).format(number);
}

function clampNumber(number: number, min: number, max: number) {
  if (number < min) return min;
  if (number > max) return max;
  return number;
}

function showMonsterInfo(monster: IMonster) {
  useAppStore.setState(s => {
    s.modals.monsterInfo.opened = true;
    s.modals.monsterInfo.monster = monster;
  });
}

function showItemInfo(item: IItem) {
  useAppStore.setState(s => {
    s.modals.itemInfo.opened = true;
    s.modals.itemInfo.item = item;
  });
}

function showOtherInfo(name: "level" | "gold" | "diamond" | "food", text: string) {
  useAppStore.setState(s => {
    s.modals.itemInfo.opened = true;
    s.modals.itemInfo.other = { name, text };
  });
}

export const util = {
  formatNumber,
  clampNumber,

  showMonsterInfo,
  showItemInfo,
  showOtherInfo,
}