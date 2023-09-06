import { util } from "../lib/util";
import { IMonster } from "./monster";

export enum MonsterFightType {
  GameEvent = "game-event",
  Campaign = "campaign",
  Tower = "tower",
}

export interface IMonsterFight {
  type: MonsterFightType;
  
  ally: IMonster;
  enemy: IMonster;

  allyStats: ReturnType<typeof util.getMonsterStats>;
  enemyStats: ReturnType<typeof util.getMonsterStats>;

  isEnemyBoss?: boolean;

  whoseTurn: "ally" | "enemy";
  turn: number;
}