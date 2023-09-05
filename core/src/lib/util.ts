import { IGameData } from "../gamedata";
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
  const modifier = boss ? 1.25 : 1;

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

    baseHp += baseHp * 5 / 100;
    baseDmg += baseDmg * 2.5 / 100;
    baseSpd += baseSpd * 1 / 100;
  }

  return {
    level: monster.level,
    hp: Math.floor(hp),
    dmg: Math.floor(dmg),
    spd: Math.floor(spd),
  }
}

function getMonsterUpgradeCost(level: number) {
  let baseGold = 20;
  let baseFood = 80;

  let gold = 0;
  let food = 0;


  for (let i = 1; i < level + 1; ++i) {
    gold += baseGold;
    food += baseFood;

    baseGold += baseGold * 5 / 100
    baseFood += baseFood * 7.5 / 100
  }

  return { gold, food };
}

function getLevelUpXp(level: number) {
  let baseXp = 10;

  let xp = 0;

  for (let i = 1; i < level + 1; ++i) {
    xp += baseXp;

    baseXp += baseXp * 5 / 100
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