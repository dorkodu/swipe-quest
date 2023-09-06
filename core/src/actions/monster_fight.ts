import { IGameData } from "../gamedata";
import { random } from "../lib/random";
import { util } from "../lib/util";
import { IMonster } from "../types/monster";
import { actionGenerateGameEvent } from "./generate_game_event";

export const actionMonsterFight = {
  act,
  actable,
}

type Info = {
  type: "start";
  ally: IMonster;
  enemy: IMonster;
  isEnemyBoss?: boolean;
  isGameEvent?: boolean;
} | { type: "progress" }

function actable(_data: IGameData, _info: Info): boolean {
  return true;
}

function act(data: IGameData, info: Info) {
  if (!actable(data, info)) return;

  switch (info.type) {
    case "start":
      const allyStats = util.getMonsterStats(info.ally);
      const enemyStats = util.getMonsterStats(info.enemy, info.isEnemyBoss);

      data.currentMonsterFight = {
        ally: info.ally,
        allyStats,
        enemy: info.enemy,
        enemyStats,
        isEnemyBoss: info.isEnemyBoss,
        isGameEvent: info.isGameEvent,
        whoseTurn: allyStats.spd >= enemyStats.spd ? "ally" : "enemy",
        turn: 1,
      }
      break;
    case "progress":
      const fight = data.currentMonsterFight;
      if (!fight) return;

      // If turn is 15 and allies hasn't won, enemy wins
      if (fight.turn === 15) {
        if (fight.isGameEvent) actionGenerateGameEvent.act(data, {});
        return "enemy";
      }

      if (fight.allyStats.hp <= 0) {
        if (fight.isGameEvent) actionGenerateGameEvent.act(data, {});
        return "enemy";
      }
      if (fight.enemyStats.hp <= 0) {
        if (fight.isGameEvent) actionGenerateGameEvent.act(data, {});
        data.player.food += random.number(data, data.player.level * 10, data.player.level * 100);
        data.player.gold += random.number(data, data.player.level * 10, data.player.level * 100);
        data.player.xp += random.number(data, data.player.level * 10, data.player.level * 100);
        util.checkPlayerXp(data);
        return "ally";
      }

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