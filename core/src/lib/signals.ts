import { IGameData } from "../gamedata"
import { Signal } from "./signal"

export const signals = {
  progressCampaign: new Signal<{ data: IGameData }>(),
  progressTower: new Signal<{ data: IGameData }>(),

  killMonster: new Signal<{ data: IGameData }>(),
  evolveMonster: new Signal<{ data: IGameData }>(),
  unlockMonster: new Signal<{ data: IGameData }>(),
  upgradeMonster: new Signal<{ data: IGameData }>(),

  unlockItem: new Signal<{ data: IGameData }>(),
  upgradeItem: new Signal<{ data: IGameData }>(),

  swipeGameEvents: new Signal<{ data: IGameData }>(),
}