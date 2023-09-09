import { IGameData } from "../gamedata";
import { util } from "../lib/util";
import { DailyMissionKey, dailyMissions } from "../types/daily_missions";

export const actionClaimDailyMission = {
  act,
  actable,
}

type Info = { mission: DailyMissionKey }

function actable(data: IGameData, info: Info): boolean {
  if (data.dailyMissions[info.mission].claimed) return false;

  const current = data.dailyMissions[info.mission].count;
  const target = dailyMissions[info.mission].count;

  if (target > current) return false;

  return true;
}

function act(data: IGameData, info: Info) {
  if (!actable(data, info)) return;

  util.applyRewards(data, dailyMissions[info.mission].rewards);
  data.dailyMissions[info.mission].claimed = true;
}