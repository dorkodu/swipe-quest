import { MonsterId, monsterData } from "../types/monster";

function getMonsterStats(id: MonsterId, level: number, boss?: boolean) {
  const modifier = boss ? 1.25 : 1;
  const threshold = boss ? 5 : 10;

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

    /* Double the base values at each: 10 if normal, 5 if boss */
    if (i % threshold === 0) {
      baseHp += baseHp * 150 / 100
      baseDmg += baseDmg * 100 / 100
      baseSpd += baseSpd * 75 / 100
    }
  }

  return {
    hp: Math.floor(hp),
    dmg: Math.floor(dmg),
    spd: Math.floor(spd),
  }
}

export const util = {
  getMonsterStats,
}