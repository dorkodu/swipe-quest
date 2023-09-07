import { IGameData } from "../gamedata";
import { util } from "../lib/util";
import { MonsterFightType } from "../types/monster_fight";
import { actionMonsterFight } from "./monster_fight";

export const actionCampaignFight = {
  act,
  actable,
}

type Info = {
  campaign: ReturnType<typeof util.getCampaignLevel>,
}

function actable(data: IGameData, info: Info): boolean {
  // If player is lower than campaign's required level
  if (data.player.level < info.campaign.requiredLevel) return false;

  return true;
}

function act(data: IGameData, info: Info) {
  if (!actable(data, info)) return;

  const enemy = info.campaign.monster;
  const ally = data.inventory.monsters[data.inventory.currentMonsterIndex];
  if (!ally) return;

  actionMonsterFight.act(
    data,
    {
      phase: "start",
      type: MonsterFightType.Campaign,
      rewards: info.campaign.rewards,
      ally,
      enemy,
      isEnemyBoss: info.campaign.isBoss,
    }
  );
}