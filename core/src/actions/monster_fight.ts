import { IGameData } from "../gamedata";
import { util } from "../lib/util";
import { IMonster } from "../types/monster";

export const actionMonsterFight = {
  act,
  actable,
}

type Info = {
  type: "start";
  ally: IMonster;
  enemy: IMonster;
  isEnemyBoss: boolean;
} | { type: "progress" }

function actable(_data: IGameData, _info: Info): boolean {
  return true;
}

function act(data: IGameData, info: Info) {
  if (!actable(data, info)) return;

  switch (info.type) {
    case "start":
      const allyStats = util.getMonsterStats(info.ally.id, info.ally.level);
      const enemyStats = util.getMonsterStats(info.enemy.id, info.enemy.level, info.isEnemyBoss);

      data.currentMonsterFight = {
        ally: info.ally,
        allyStats,
        enemy: info.enemy,
        enemyStats,
        isEnemyBoss: info.isEnemyBoss,
        whoseTurn: allyStats.spd >= enemyStats.spd ? "ally" : "enemy",
        turn: 1,
      }
      break;
    case "progress":
      const fight = data.currentMonsterFight;
      if (!fight) return;

      if (fight.allyStats.hp <= 0) return "enemy";
      if (fight.enemyStats.hp <= 0) return "ally";

      switch (fight.whoseTurn) {
        case "ally": fight.enemyStats.hp -= fight.allyStats.dmg; break;
        case "enemy": fight.allyStats.hp -= fight.enemyStats.dmg; break;
      }

      fight.whoseTurn = fight.whoseTurn === "ally" ? "enemy" : "ally";
      fight.turn += 0.5;
      break;
  }

  return;
}