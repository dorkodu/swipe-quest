import { IGameData } from "../gamedata";
import { IGameEvent, GameEventId } from "../types/game_event";
import { ItemId, itemData } from "../types/item";
import { MonsterId, monsterData } from "../types/monster";

export const actionGenerateGameEvent = {
  act,
  actable,
}

type Info = {}

function actable(_data: IGameData, _info: Info): boolean {
  return true;
}

function act(data: IGameData, info: Info) {
  if (!actable(data, info)) return;

  const id = data.srandom.percent<IGameEvent[GameEventId]["id"]>(
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
    case "item": eventItem(id, data, info); break;
    case "gold": eventGold(id, data, info); break;
    case "diamond": eventDiamond(id, data, info); break;
    case "monster_fight": eventMonsterFight(id, data, info); break;
    case "monster_unlock": eventMonsterUnlock(id, data, info); break;
    case "mystery_box": eventMysteryBox(id, data, info); break;
    case "scratch_card": eventScratchCard(id, data, info); break;
    case "experience": eventExperience(id, data, info); break;
    case "food": eventFood(id, data, info); break;
    case "boss_fight": eventBossFight(id, data, info); break;
  }
}

function eventItem(id: "item", data: IGameData, _info: Info) {
  const itemId = data.srandom.percent(
    Object.keys(itemData).map(result => ({ percent: 1, result: result as ItemId }))
  );

  if (!itemId) return;

  data.currentGameEvent = {
    id,
    itemId
  }
}

function eventGold(id: "gold", data: IGameData, _info: Info) {
  data.currentGameEvent = {
    id,
    count: data.srandom.number(1, 100 + 1),
  }

  data.player.gold += data.currentGameEvent.count;
}

function eventDiamond(id: "diamond", data: IGameData, _info: Info) {
  data.currentGameEvent = {
    id,
    count: data.srandom.number(1, 100 + 1),
  }
  
  data.player.diamond += data.currentGameEvent.count;
}

function eventMonsterFight(id: "monster_fight", data: IGameData, _info: Info) {
  const monsterId = data.srandom.percent(

    Object.keys(monsterData).map(result => ({ percent: 1, result: result as MonsterId }))
  );

  if (!monsterId) return;

  data.currentGameEvent = {
    id,
    monsterId,
    level: data.srandom.number(1, 100 + 1),
  }
}

function eventMonsterUnlock(id: "monster_unlock", data: IGameData, _info: Info) {
  const monsterId = data.srandom.percent(

    Object.keys(monsterData).map(result => ({ percent: 1, result: result as MonsterId }))
  );

  if (!monsterId) return;

  data.currentGameEvent = {
    id,
    monsterId,
  }
}

function eventMysteryBox(id: "mystery_box", data: IGameData, _info: Info) {
  data.currentGameEvent = {
    id,
  }
}

function eventScratchCard(id: "scratch_card", data: IGameData, _info: Info) {
  data.currentGameEvent = {
    id,
  }
}

function eventExperience(id: "experience", data: IGameData, _info: Info) {
  data.currentGameEvent = {
    id,
    count: data.srandom.number(1, 100 + 1),
  }
}

function eventFood(id: "food", data: IGameData, _info: Info) {
  data.currentGameEvent = {
    id,
    count: data.srandom.number(1, 100 + 1),
  }

  data.player.food += data.currentGameEvent.count;
}

function eventBossFight(id: "boss_fight", data: IGameData, _info: Info) {
  const monsterId = data.srandom.percent(

    Object.keys(monsterData).map(result => ({ percent: 1, result: result as MonsterId }))
  );

  if (!monsterId) return;

  data.currentGameEvent = {
    id,
    monsterId,
    level: data.srandom.number(1, 100 + 1),
  }
}