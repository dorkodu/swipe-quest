import { IGameData } from "../gamedata";
import { constants } from "../types/constants";
import { ItemId, itemData } from "../types/item";
import { IMonster, monsterData } from "../types/monster";

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

export const util = {
  getItemStats,
  getMonsterItemsStats,

  getMonsterPower,
  getMonsterStats,
  getMonsterUpgradeCost,

  getLevelUpXp,
  checkPlayerXp,
}