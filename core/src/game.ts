import { gameplay } from "./gameplay";
import { createGameData } from "./gamedata";
import { util } from "./lib/util";

// Import daily missions here so the signals are initialized
import "./types/daily_missions";

export const game = {
  play: gameplay,
  util: util,

  createGameData: createGameData,
}