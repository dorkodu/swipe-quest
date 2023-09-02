import { monsterData } from "../data/monster_data";
import { IGameData } from "../gamedata";
import { random } from "../lib/random";
import { IGameEvent } from "../types/game_event";
import { MonsterId } from "../types/monster";

export const actionGenerateGameEvent = {
  act,
  actable,
}

type Info = { seed: number }

function actable(_data: IGameData, _info: Info): boolean {
  return true;
}

function act(data: IGameData, info: Info) {
  if (!actable(data, info)) return;

  const id = random.percent<IGameEvent["id"]>(
    info.seed,
    [
      { result: "item", percent: 5 },
      { result: "gold", percent: 25 },
      { result: "diamond", percent: 1 },
      { result: "monster_fight", percent: 50 },
      { result: "monster_unlock", percent: 1 },
      { result: "mystery_box", percent: 10 },
      { result: "scratch_card", percent: 10 },
      { result: "experience", percent: 10 },
      { result: "food", percent: 10 },
      { result: "boss_fight", percent: 5 },
    ]
  );

  switch (id) {
    case "item":
      data.currentGameEvent = {
        id,
      }
      break;
    case "gold":
      data.currentGameEvent = {
        id,
        count: random.number(info.seed, 1, 100),
      }
      break;
    case "diamond":
      data.currentGameEvent = {
        id,
        count: random.number(info.seed, 1, 100),
      }
      break;
    case "monster_fight":
      data.currentGameEvent = {
        id,
        monsterId: random.percent(
          info.seed,
          Object.keys(monsterData).map(result => ({ percent: 1, result: result as MonsterId }))
        ) || MonsterId.None,
      }
      break;
    case "monster_unlock":
      data.currentGameEvent = {
        id,
        monsterId: random.percent(
          info.seed,
          Object.keys(monsterData).map(result => ({ percent: 1, result: result as MonsterId }))
        ) || MonsterId.None,
      }
      break;
    case "mystery_box":
      data.currentGameEvent = {
        id,
      }
      break;
    case "scratch_card":
      data.currentGameEvent = {
        id,
      }
      break;
    case "experience":
      data.currentGameEvent = {
        id,
        count: random.number(info.seed, 1, 100),
      }
      break;
    case "food":
      data.currentGameEvent = {
        id,
      }
      break;
    case "boss_fight":
      data.currentGameEvent = {
        id,
        monsterId: random.percent(
          info.seed,
          Object.keys(monsterData).map(result => ({ percent: 1, result: result as MonsterId }))
        ) || MonsterId.None,
      }
      break;
  }
}