import { MonsterId, monsterData } from "../types/monster";

function getMonsterStats(id: MonsterId, level: number, boss?: boolean) {
  const modifier = boss ? 1.25 : 1;

  let baseHp = monsterData[id].baseHp * modifier;
  let baseDmg = monsterData[id].baseDmg * modifier;
  let baseSpd = monsterData[id].baseSpd * modifier;

  let hp = 0;
  let dmg = 0;
  let spd = 0;

  for (let i = 1; i < level + 1; ++i) {
    hp += baseHp
    dmg += baseDmg
    spd += baseSpd

    baseHp += baseHp * 5 / 100;
    baseDmg += baseDmg * 2.5 / 100;
    baseSpd += baseSpd * 1 / 100;
  }

  return {
    level,
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

export const util = {
  getMonsterStats,
  getMonsterUpgradeCost,
}