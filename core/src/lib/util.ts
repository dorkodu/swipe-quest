import { game } from "../game";
import { IGameData } from "../gamedata";
import { constants } from "../types/constants";
import { IItem, IItemData, ItemId, ItemType, amuletData, armorData, itemData, ringData, runeData, weaponData } from "../types/item";
import { IMonster, MonsterId, monsterData } from "../types/monster";
import { IRebirth } from "../types/rebirth";
import { IInventory, IRewards } from "../types/types";
import { random } from "./random";
import { signals } from "./signals";

function equipItem(
  data: IGameData,
  monster: IMonster,
  itemId: ItemId | undefined,
  type: ItemType,
) {
  const _monster = data.inventory.monsters.find(m => m === monster);
  if (!_monster) return;

  const itemToEquip = itemId && data.inventory.items[itemId];

  const itemToUnequip = _monster[type];

  // Un-equip the item if exists
  if (itemToUnequip) {
    if (!data.inventory.items[itemToUnequip]) data.inventory.items[itemToUnequip] = { id: itemToUnequip, count: 0 }
    data.inventory.items[itemToUnequip]!.count++;
  }

  _monster[type] = itemToEquip ? itemToEquip.id : undefined;
  itemToEquip && itemToEquip.count--;

  if (itemId && itemToEquip && itemToEquip.count === 0) delete data.inventory.items[itemId];
}

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

function getItemUpgrade(itemId: ItemId | undefined): ItemId | undefined {
  if (!itemId) return undefined;

  let data: { [key in ItemId]?: IItemData };
  switch (itemData[itemId].type) {
    case ItemType.Weapon: data = weaponData; break;
    case ItemType.Armor: data = armorData; break;
    case ItemType.Rune: data = runeData; break;
    case ItemType.Ring: data = ringData; break;
    case ItemType.Amulet: data = amuletData; break;
    default: return undefined;
  }

  const item = itemData[itemId];
  const itemIds = Object.keys(itemData) as ItemId[];

  switch (item.stars) {
    case 1: return itemIds.filter(i => data[i]?._id === item._id && data[i]?.stars === 2)[0];
    case 2: return itemIds.filter(i => data[i]?._id === item._id && data[i]?.stars === 3)[0];
    case 3: return itemIds.filter(i => data[i]?._id === item._id + 1 && data[i]?.stars === 1)[0];
  }

  return undefined;
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

function getMonsterEvolve(data: IGameData, monsterIndexes: (number | undefined)[]): IMonster | undefined {
  const monsterIndex = monsterIndexes[0];
  if (monsterIndex === undefined) return undefined;

  const monster = data.inventory.monsters[monsterIndex];
  if (!monster) return undefined;

  const length = monsterIndexes.filter(i => i !== undefined).length === 3;
  if (!length) return undefined;

  const same = monsterIndexes.filter(i => {
    const m = i !== undefined && data.inventory.monsters[i];
    return m && m.id === monster.id;
  }).length === 3;
  if (!same) return undefined;

  const monsterIds = Object.keys(monsterData) as MonsterId[];
  const evolvedId = monsterIds.filter(i => monsterData[i]._id === monsterData[monster.id]._id + 1)[0];
  if (!evolvedId) return undefined;

  return { id: evolvedId, level: 1 }
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

    signals.playerLevelUp.dispatch({ data });
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
function sortItems(items: IItem[]): IItem[] {
  const weapons: IItem[] = [];
  const armors: IItem[] = [];
  const runes: IItem[] = [];
  const rings: IItem[] = [];
  const amulets: IItem[] = [];

  for (let i = 0; i < items.length; ++i) {
    const item = items[i];
    if (!item) continue;

    switch (itemData[item.id].type) {
      case ItemType.Weapon: weapons.push(item); break;
      case ItemType.Armor: armors.push(item); break;
      case ItemType.Rune: runes.push(item); break;
      case ItemType.Ring: rings.push(item); break;
      case ItemType.Amulet: amulets.push(item); break;
    }
  }

  weapons.sort((a, b) => util.getItemPower(b.id) - util.getItemPower(a.id))
  armors.sort((a, b) => util.getItemPower(b.id) - util.getItemPower(a.id))
  runes.sort((a, b) => util.getItemPower(b.id) - util.getItemPower(a.id))
  rings.sort((a, b) => util.getItemPower(b.id) - util.getItemPower(a.id))
  amulets.sort((a, b) => util.getItemPower(b.id) - util.getItemPower(a.id))

  return [...weapons, ...armors, ...runes, ...rings, ...amulets];
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
  data.player.xp += rewards.xp ? rewards.xp * data.rebirth.multipliers.xp : 0;
  data.player.gold += rewards.gold ? rewards.gold * data.rebirth.multipliers.gold : 0;
  data.player.diamond += rewards.diamond ? rewards.diamond * data.rebirth.multipliers.diamond : 0;
  data.player.food += rewards.food ? rewards.food * data.rebirth.multipliers.food : 0;

  data.inventory.monsters.push(...(rewards.monsters || []));
  rewards.items?.forEach(item => {
    if (!data.inventory.items[item.id]) data.inventory.items[item.id] = { id: item.id, count: 0 }
    data.inventory.items[item.id]!.count++;
  });

  checkPlayerXp(data);
}

function getCampaignLevel(level: number): { monster: IMonster, rewards: IRewards, isBoss: boolean, requiredLevel: number } {
  const monsterId: MonsterId = random.percent(
    { seed: level },
    Object.keys(monsterData).map(result => ({ percent: 1, result: result as MonsterId }))
  ) || "Angel";

  const monster: IMonster = { id: monsterId, level }
  const rewards: IRewards = { xp: level * 100, gold: level * 100, food: level * 100 }
  const isBoss = level % 10 === 0;
  const requiredLevel = Math.floor(level / 2);

  if (level % 10 === 0) {
    const _id = Math.floor(level / 30) + 1;
    const monsterIds = Object.keys(monsterData) as MonsterId[];
    const monsterId = monsterIds.filter(m => monsterData[m]._id === _id)[0];
    if (monsterId) rewards.monsters = [{ id: monsterId, level: 1 }];
  }
  else if (level % 5 === 0) {
    const _id = Math.floor(level / 30) + 1;
    const _stars = (Math.floor(level / 10) % 3) + 1;
    const itemIds = Object.keys(itemData) as ItemId[];
    const items = itemIds.filter(id => itemData[id]._id === _id && itemData[id].stars === _stars);
    const itemId = random.percent({ seed: level * 10000 }, items.map(i => ({ result: i, percent: 1 })));
    if (itemId) rewards.items = [{ id: itemId, count: 1 }];
  }

  return { monster, rewards, isBoss, requiredLevel };
}

function getTowerLevel(level: number): { monster: IMonster, rewards: IRewards } {
  const monsterId: MonsterId = random.percent(
    { seed: -level },
    Object.keys(monsterData).map(result => ({ percent: 1, result: result as MonsterId }))
  ) || "Angel";

  const monster: IMonster = { id: monsterId, level }
  const rewards: IRewards = { food: level * 200 }

  if (level % 10 === 0) {
    const _id = Math.floor(level / 30) + 1;
    const monsterIds = Object.keys(monsterData) as MonsterId[];
    const monsterId = monsterIds.filter(m => monsterData[m]._id === _id)[0];
    if (monsterId) rewards.monsters = [{ id: monsterId, level: 1 }];
  }
  else if (level % 5 === 0) {
    const _id = Math.floor(level / 30) + 1;
    const _stars = (Math.floor(level / 10) % 3) + 1;
    const itemIds = Object.keys(itemData) as ItemId[];
    const items = itemIds.filter(id => itemData[id]._id === _id && itemData[id].stars === _stars);
    const itemId = random.percent({ seed: level * 10000 }, items.map(i => ({ result: i, percent: 1 })));
    if (itemId) rewards.items = [{ id: itemId, count: 1 }];
  }

  return { monster, rewards };
}

function resetDailyMissions(data: IGameData) {
  data.dailyMissionDate = Date.now();
  Object
    .values(data.dailyMissions)
    .forEach(m => {
      m.count = 0;
      m.claimed = false;
    })
}

function getRebirthPoints(data: IGameData) {
  let points = data.player.level + data.campaign.level + data.tower.level;

  return points;
}

function getRebirthMultiplierCost(data: IGameData, multiplier: keyof IRebirth["multipliers"]) {
  switch (multiplier) {
    case "xp": return Math.pow(100, data.rebirth.multipliers["xp"]);
    case "gold": return Math.pow(100, data.rebirth.multipliers["gold"]);
    case "food": return Math.pow(100, data.rebirth.multipliers["food"]);
    case "diamond": return Math.pow(100, data.rebirth.multipliers["diamond"]);
    case "monster": return Math.pow(100, data.rebirth.multipliers["monster"]);
    case "item": return Math.pow(100, data.rebirth.multipliers["item"]);
  }
}

export const util = {
  equipItem,
  getItemPower,
  getItemStats,
  getItemUpgrade,
  getMonsterItemsStats,

  getMonsterPower,
  getMonsterStats,
  getMonsterUpgradeCost,
  getMonsterEvolve,

  getLevelUpXp,
  checkPlayerXp,

  sortMonsters,
  sortItems,

  getBetterItem,

  applyRewards,

  getCampaignLevel,
  getTowerLevel,

  resetDailyMissions,

  getRebirthPoints,
  getRebirthMultiplierCost,
}