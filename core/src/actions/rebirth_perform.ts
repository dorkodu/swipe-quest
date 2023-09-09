import { IGameData } from "../gamedata";
import { util } from "../lib/util";
import { constants } from "../types/constants";

export const actionRebirthPerform = {
  act,
  actable,
}

type Info = {}

function actable(data: IGameData, _info: Info): boolean {
  if (util.getRebirthPoints(data) < constants.REBIRTH_MINIMUM_POINTS_TO_PERFORM) return false;

  return true;
}

function act(data: IGameData, info: Info) {
  if (!actable(data, info)) return;

  // Increase player rebirth points
  data.rebirth.points += util.getRebirthPoints(data);

  // Reset player level, xp, gold, food, monsters and items
  data.player.level = 1;
  data.player.xp = 0;
  data.player.gold = 0;
  data.player.food = 1;
  data.inventory.monsters = [
    { id: "Angel", level: 1 }
  ];
  data.inventory.items = {
    "Common Ancient Sword": {
      id: "Common Ancient Sword", count: 1
    }
  };

  // Reset campaing and tower
  data.campaign.level = 1;
  data.tower.level = 1;

  // Reset current game event and monster fight
  data.currentGameEvent = undefined;
  data.currentMonsterFight = undefined;
}