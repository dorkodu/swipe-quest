import { game } from "../game";
import { IGameData } from "../gamedata";
import { constants } from "../types/constants";
import { IItem, IItemData, ItemId, itemData } from "../types/item";
import { IMonster, MonsterId, monsterData } from "../types/monster";
import { IInventory, IRewards } from "../types/types";
import { random } from "./random";

function getItemPower(itemId: ItemId | undefined) {
  const stats = getItemStats(itemId);
  return stats.hp + stats.dmg + stats.spd;
}

function getItemStats(itemId: ItemId | undefined) {
  const hp = itemId && itemData[itemId].hp || 0;
  const dmg = itemId && itemData[itemId].dmg || 0;
  const spd = itemId && itemData[itemId].spd || 0;

  return {
    hp: Math.floor(hp),
    dmg: Math.floor(dmg),
    spd: Math.floor(spd),
  }
}

function getMonsterItemsStats(monster: IMonster) {
  const weapon = getItemStats(monster.weapon);
  const armor = getItemStats(monster.armor);
  const rune = getItemStats(monster.rune);
  const ring = getItemStats(monster.ring);
  const amulet = getItemStats(monster.amulet);

  return {
    hp: weapon.hp + armor.hp + rune.hp + ring.hp + amulet.hp,
    dmg: weapon.dmg + armor.dmg + rune.dmg + ring.dmg + amulet.dmg,
    spd: weapon.spd + armor.spd + rune.spd + ring.spd + amulet.spd,
  }
}

function getMonsterPower(hp: number, dmg: number, spd: number) {
  return hp + dmg + spd;
}

function getMonsterStats(monster: IMonster, boss?: boolean) {
  const itemStats = getMonsterItemsStats(monster);
  const modifier = boss ? constants.MONSTER_STATS_BOSS_MODIFIER : 1;

  let baseHp = monsterData[monster.id].baseHp * modifier;
  let baseDmg = monsterData[monster.id].baseDmg * modifier;
  let baseSpd = monsterData[monster.id].baseSpd * modifier;

  let hp = itemStats.hp;
  let dmg = itemStats.dmg;
  let spd = itemStats.spd;

  for (let i = 1; i < monster.level + 1; ++i) {
    hp += baseHp
    dmg += baseDmg
    spd += baseSpd

    baseHp += baseHp * constants.MONSTER_STATS_HP_MODIFIER;
    baseDmg += baseDmg * constants.MONSTER_STATS_DMG_MODIFIER;
    baseSpd += baseSpd * constants.MONSTER_STATS_SPD_MODIFIER;
  }

  return {
    level: monster.level,
    hp: Math.floor(hp),
    dmg: Math.floor(dmg),
    spd: Math.floor(spd),
  }
}

function getMonsterUpgradeCost(level: number) {
  let baseGold = constants.MONSTER_UPGRADE_COST_BASE_GOLD;
  let baseFood = constants.MONSTER_UPGRADE_COST_BASE_FOOD;

  let gold = 0;
  let food = 0;

  for (let i = 1; i < level + 1; ++i) {
    gold += baseGold;
    food += baseFood;

    baseGold += baseGold * constants.MONSTER_UPGRADE_COST_GOLD_MODIFIER;
    baseFood += baseFood * constants.MONSTER_UPGRADE_COST_FOOD_MODIFIER;
  }

  return { gold, food };
}

function getLevelUpXp(level: number) {
  let baseXp = constants.PLAYER_LEVEL_UP_BASE_XP;

  let xp = 0;

  for (let i = 1; i < level + 1; ++i) {
    xp += baseXp;

    baseXp += baseXp * constants.PLAYER_LEVEL_UP_MODIFIER;
  }

  return xp;
}

function checkPlayerXp(data: IGameData) {
  let cost = getLevelUpXp(data.player.level);

  while (data.player.xp >= cost) {
    data.player.xp -= cost;
    data.player.level++;

    cost = getLevelUpXp(data.player.level);
  }
}

function sortMonsters(data: IGameData) {
  const monster = data.inventory.monsters[data.inventory.currentMonsterIndex];
  if (!monster) return;

  // Sort monster by level and re-calculate the current monster index
  data.inventory.monsters.sort((a, b) => b.level - a.level);
  data.inventory.currentMonsterIndex = data.inventory.monsters.indexOf(monster);
}

/**
 * Sorts the items by the strongest to the weakest.
 * @param items 
 * @returns 
 */
function sortItems(items: IItem[]) {
  return items.sort((a, b) => util.getItemPower(b.id) - util.getItemPower(a.id));
}

function getBetterItem(
  inventory: IInventory,
  items: { [key in ItemId]?: IItemData }
): ItemId | undefined {
  const sortedItems = game.util.sortItems(
    Object
      .keys(items)
      .map(v => inventory.items[v as ItemId])
      .filter(Boolean) as any
  );

  const monster = inventory.monsters[inventory.currentMonsterIndex];
  if (!monster) return undefined;

  const bestItem = sortedItems[0];
  if (!bestItem) return undefined;

  const itemType = itemData[bestItem.id].type;
  if (!itemType) return undefined

  const monsterItemId = monster[itemType];
  if (!monsterItemId) return bestItem.id;

  if (util.getItemPower(bestItem.id) > util.getItemPower(monsterItemId)) return bestItem.id;
  return undefined;
}

function applyRewards(data: IGameData, rewards: IRewards) {
  data.player.xp += rewards.xp || 0;
  data.player.gold += rewards.gold || 0;
  data.player.diamond += rewards.diamond || 0;
  data.player.food += rewards.food || 0;

  data.inventory.monsters.push(...(rewards.monsters || []));
  rewards.items?.forEach(item => {
    if (!data.inventory.items[item.id]) data.inventory.items[item.id] = { id: item.id, count: 0 }
    data.inventory.items[item.id]!.count++;
  });

  checkPlayerXp(data);
}

function getCampaignLevel(level: number): { monster: IMonster, rewards: IRewards, isBoss: boolean } {
  const monsterId: MonsterId = random.percent(
    { seed: level },
    Object.keys(monsterData).map(result => ({ percent: 1, result: result as MonsterId }))
  ) || "Angel";

  const monster: IMonster = { id: monsterId, level }
  const rewards: IRewards = { xp: level * 10, gold: level * 10, food: level * 10 }
  const isBoss = level % 10 === 0;

  return { monster, rewards, isBoss };
}

function getTowerLevel(level: number): { monster: IMonster, rewards: IRewards } {
  const monsterId: MonsterId = random.percent(
    { seed: level },
    Object.keys(monsterData).map(result => ({ percent: 1, result: result as MonsterId }))
  ) || "Angel";

  const monster: IMonster = { id: monsterId, level }
  const rewards: IRewards = { gold: level * 25 }

  if (level % 10 === 0) {
    const items = Object.keys(itemData) as ItemId[];
    const itemId = random.percent(
      { seed: level },
      items.map(result => ({ percent: (1 / itemData[result]._id) * items.length * 100, result }))
    );
    if (itemId) rewards.items = [{ id: itemId, count: 1 }];
  }

  return { monster, rewards };
}

export const util = {
  getItemPower,
  getItemStats,
  getMonsterItemsStats,

  getMonsterPower,
  getMonsterStats,
  getMonsterUpgradeCost,

  getLevelUpXp,
  checkPlayerXp,

  sortMonsters,
  sortItems,

  getBetterItem,

  applyRewards,

  getCampaignLevel,
  getTowerLevel,
}