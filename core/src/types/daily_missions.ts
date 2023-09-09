import { IGameData } from "../gamedata";
import { math } from "../lib/math";
import { signals } from "../lib/signals";
import { IRewards } from "./types";

export type DailyMissionKey =
  "progressCampaign" |
  "progressTower" |
  "killMonster" |
  "unlockMonster" |
  "unlockItem" |
  "evolveMonster" |
  "upgradeItem" |
  "swipeGameEvents" |
  "completeAllDailyMissions";

export type IDailyMissions = Record<DailyMissionKey, { count: number, claimed?: boolean }>;

export const dailyMissions: Record<DailyMissionKey, { count: number, rewards: IRewards }> = {
  progressCampaign: { count: 1, rewards: { monsters: [{ id: "Angel", level: 1 }] } },
  progressTower: { count: 1, rewards: { monsters: [{ id: "Angel", level: 1 }] } },
  killMonster: { count: 10, rewards: { xp: 1000 } },
  unlockMonster: { count: 1, rewards: { food: 10000 } },
  unlockItem: { count: 1, rewards: { gold: 10000 } },
  evolveMonster: { count: 1, rewards: { food: 10000 } },
  upgradeItem: { count: 1, rewards: { gold: 10000 } },
  swipeGameEvents: { count: 100, rewards: { xp: 10000 } },
  completeAllDailyMissions: { count: 8, rewards: { diamond: 1000 } },
}

signals.progressCampaign.add(({ data }) => { progressDailyMission(data, "progressCampaign") })
signals.progressTower.add(({ data }) => { progressDailyMission(data, "progressTower") })
signals.killMonster.add(({ data }) => { progressDailyMission(data, "killMonster") })
signals.unlockMonster.add(({ data }) => { progressDailyMission(data, "unlockMonster") })
signals.unlockItem.add(({ data }) => { progressDailyMission(data, "unlockItem") })
signals.evolveMonster.add(({ data }) => { progressDailyMission(data, "evolveMonster") })
signals.upgradeItem.add(({ data }) => { progressDailyMission(data, "upgradeItem") })
signals.swipeGameEvents.add(({ data }) => { progressDailyMission(data, "swipeGameEvents") })

function progressDailyMission(data: IGameData, key: DailyMissionKey) {
  // Increase mission progress count
  const mission = data.dailyMissions[key];
  mission.count = math.clamp(mission.count + 1, 0, dailyMissions[key].count);

  // If mission is not completed, return
  if (data.dailyMissions[key].count < dailyMissions[key].count) return;

  // If the mission is not "completeAllDailyMissions", progress that mission too
  if (key !== "completeAllDailyMissions") progressDailyMission(data, "completeAllDailyMissions");
}