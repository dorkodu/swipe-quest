import { IGameData } from "../gamedata";
import { util } from "../lib/util";

export const actionResetDailyMissions = {
  act,
  actable,
}

type Info = {}

function actable(data: IGameData, _info: Info): boolean {
  if (Date.now() < util.getDailyMissionResetDate(data)) return false;

  return true;
}

function act(data: IGameData, info: Info) {
  if (!actable(data, info)) return;

  data.dailyMissionDate = Date.now();
  Object
    .values(data.dailyMissions)
    .forEach(m => {
      m.count = 0;
      m.claimed = false;
    })
}