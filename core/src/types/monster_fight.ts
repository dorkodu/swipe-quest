import { util } from "../lib/util";
import { IMonster } from "./monster";

export interface IMonsterFight {
  ally: IMonster;
  enemy: IMonster;

  allyStats: ReturnType<typeof util.getMonsterStats>;
  enemyStats: ReturnType<typeof util.getMonsterStats>;

  isEnemyBoss?: boolean;
  isGameEvent?: boolean;

  whoseTurn: "ally" | "enemy";
  turn: number;
}