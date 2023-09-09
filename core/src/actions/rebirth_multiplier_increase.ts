import { IGameData } from "../gamedata";
import { util } from "../lib/util";
import { constants } from "../types/constants";
import { IRebirth } from "../types/rebirth";

export const actionRebirthMultiplierIncrease = {
  act,
  actable,
}

type Info = { multiplier: keyof IRebirth["multipliers"] }

function actable(data: IGameData, info: Info): boolean {
  const cost = util.getRebirthMultiplierCost(data, info.multiplier);
  if (cost > data.rebirth.points) return false;

  return true;
}

function act(data: IGameData, info: Info) {
  if (!actable(data, info)) return;

  const cost = util.getRebirthMultiplierCost(data, info.multiplier);
  data.rebirth.points -= cost;
  data.rebirth.multipliers[info.multiplier] += constants.REBIRTH_MULTIPLIER_INCREASE;
}