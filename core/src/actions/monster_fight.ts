import { IGameData } from "../gamedata";
import { util } from "../lib/util";
import { IMonster } from "../types/monster";
import { IMonsterFight, MonsterFightType } from "../types/monster_fight";
import { IRewards } from "../types/types";
import { actionGenerateGameEvent } from "./generate_game_event";

export const actionMonsterFight = {
  act,
  actable,
}

type Info = {
  phase: "start";
  type: MonsterFightType;
  rewards: IRewards;
  ally: IMonster;
  enemy: IMonster;
  isEnemyBoss?: boolean;
} | { phase: "progress" }

function actable(_data: IGameData, _info: Info): boolean {
  return true;
}

function act(data: IGameData, info: Info): "ally" | "enemy" | undefined {
  if (!actable(data, info)) return;

  switch (info.phase) {
    case "start":
      const allyStats = util.getMonsterStats(info.ally);
      const enemyStats = util.getMonsterStats(info.enemy, info.isEnemyBoss);

      data.currentMonsterFight = {
        type: info.type,
        rewards: info.rewards,
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

      // If turn is 15 and noone won, whoever has the highest hp wins
      if (fight.turn === 15) {
        if (fight.allyStats.hp > fight.enemyStats.hp) {
          allyWin(data, fight);
          return "ally";
        }
        else {
          enemyWin(data, fight);
          return "enemy";
        }
      }

      if (fight.allyStats.hp <= 0) {
        enemyWin(data, fight);
        return "enemy";
      }
      if (fight.enemyStats.hp <= 0) {
        allyWin(data, fight);
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

function allyWin(data: IGameData, fight: IMonsterFight) {
  if (fight.type === MonsterFightType.GameEvent) actionGenerateGameEvent.act(data, {});
  if (fight.type === MonsterFightType.Campaign) data.campaign.level++;
  if (fight.type === MonsterFightType.Tower) data.tower.level++;
  util.applyRewards(data, fight.rewards);
}

function enemyWin(data: IGameData, fight: IMonsterFight) {
  if (fight.type === MonsterFightType.GameEvent) actionGenerateGameEvent.act(data, {});
}