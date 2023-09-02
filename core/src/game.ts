import { gameplay } from "./gameplay";
import { createGameData } from "./gamedata";
import { util } from "./lib/util";

export const game = {
  play: gameplay,
  util: util,

  createGameData: createGameData,
}