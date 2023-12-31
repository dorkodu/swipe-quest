import { IGameData } from "../gamedata";
import { math } from "../lib/math";
import { random } from "../lib/random";
import { signals } from "../lib/signals";
import { util } from "../lib/util";
import { constants } from "../types/constants";
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

  const id = random.percent<IGameEvent[GameEventId]["id"]>(
    data,
    [
      { result: "item", percent: constants.GAME_EVENT_ITEM_PERCENT },
      { result: "gold", percent: constants.GAME_EVENT_GOLD_PERCENT },
      { result: "diamond", percent: constants.GAME_EVENT_DIAMOND_PERCENT },
      { result: "monster_fight", percent: constants.GAME_EVENT_MONSTER_FIGHT_PERCENT },
      { result: "monster_unlock", percent: constants.GAME_EVENT_MONSTER_UNLOCK_PERCENT },
      { result: "mystery_box", percent: constants.GAME_EVENT_MYSTERY_BOX_PERCENT },
      { result: "scratch_card", percent: constants.GAME_EVENT_SCRATCH_CARD_PERCENT },
      { result: "experience", percent: constants.GAME_EVENT_EXPERIENCE_PERCENT },
      { result: "food", percent: constants.GAME_EVENT_FOOD_PERCENT },
      { result: "boss_fight", percent: constants.GAME_EVENT_BOSS_FIGHT_PERCENT },
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

  signals.swipeGameEvents.dispatch({ data });
}

function eventItem(id: "item", data: IGameData, _info: Info) {
  const items = Object.keys(itemData) as ItemId[];
  const itemId = random.percent(
    data,
    items.map(result => ({
      percent: Math.min(1, Math.pow(1 / (itemData[result]._id / data.rebirth.multipliers.item), 2.25)),
      result
    }))
  );

  if (!itemId) return;

  data.currentGameEvent = {
    id,
    itemId
  }

  if (!data.inventory.items[itemId]) data.inventory.items[itemId] = { id: itemId, count: 0 }
  data.inventory.items[itemId]!.count++;

  signals.unlockItem.dispatch({ data });
}

function eventGold(id: "gold", data: IGameData, _info: Info) {
  data.currentGameEvent = {
    id,
    count: random.number(
      data,
      data.player.level * constants.GAME_EVENT_GOLD_MIN_PER_LEVEL * data.rebirth.multipliers.gold,
      data.player.level * constants.GAME_EVENT_GOLD_MAX_PER_LEVEL * data.rebirth.multipliers.gold
    ),
  }

  data.player.gold += data.currentGameEvent.count;
}

function eventDiamond(id: "diamond", data: IGameData, _info: Info) {
  data.currentGameEvent = {
    id,
    count: random.number(
      data,
      data.player.level * constants.GAME_EVENT_DIAMOND_MIN_PER_LEVEL * data.rebirth.multipliers.diamond,
      data.player.level * constants.GAME_EVENT_DIAMOND_MAX_PER_LEVEL * data.rebirth.multipliers.diamond
    ),
  }

  data.player.diamond += data.currentGameEvent.count;
}

function eventMonsterFight(id: "monster_fight", data: IGameData, _info: Info) {
  const monsterId = random.percent(
    data,
    Object.keys(monsterData).map(result => ({ percent: 1, result: result as MonsterId }))
  );

  if (!monsterId) return;

  const currentMonster = data.inventory.monsters[data.inventory.currentMonsterIndex];
  if (!currentMonster) return;

  data.currentGameEvent = {
    id,
    monsterId,
    level: random.number(
      data,
      math.clamp(
        currentMonster.level - constants.GAME_EVENT_MONSTER_FIGHT_MIN_LEVEL_DIFFERENCE,
        1,
        Number.MAX_SAFE_INTEGER
      ),
      currentMonster.level + constants.GAME_EVENT_MONSTER_FIGHT_MAX_LEVEL_DIFFERENCE
    ),
  }
}

function eventMonsterUnlock(id: "monster_unlock", data: IGameData, _info: Info) {
  const monsters = Object.keys(monsterData) as MonsterId[];
  const monsterId = random.percent(
    data,
    monsters.map(result => ({
      percent: Math.min(1, Math.pow(1 / (monsterData[result]._id * data.rebirth.multipliers.monster), 2.25)),
      result
    }))
  );

  if (!monsterId) return;

  data.currentGameEvent = {
    id,
    monsterId,
  }

  data.inventory.monsters.push({ id: monsterId, level: 1 });

  signals.unlockMonster.dispatch({ data });
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
    count: random.number(
      data,
      data.player.level * constants.GAME_EVENT_EXPERIENCE_MIN_PER_LEVEL * data.rebirth.multipliers.xp,
      data.player.level * constants.GAME_EVENT_EXPERIENCE_MAX_PER_LEVEL * data.rebirth.multipliers.xp
    ),
  }

  data.player.xp += data.currentGameEvent.count;

  util.checkPlayerXp(data);
}

function eventFood(id: "food", data: IGameData, _info: Info) {
  data.currentGameEvent = {
    id,
    count: random.number(
      data,
      data.player.level * constants.GAME_EVENT_FOOD_MIN_PER_LEVEL * data.rebirth.multipliers.food,
      data.player.level * constants.GAME_EVENT_FOOD_MAX_PER_LEVEL * data.rebirth.multipliers.food
    ),
  }

  data.player.food += data.currentGameEvent.count;
}

function eventBossFight(id: "boss_fight", data: IGameData, _info: Info) {
  const monsterId = random.percent(
    data,
    Object.keys(monsterData).map(result => ({ percent: 1, result: result as MonsterId }))
  );

  if (!monsterId) return;

  const currentMonster = data.inventory.monsters[data.inventory.currentMonsterIndex];
  if (!currentMonster) return;

  data.currentGameEvent = {
    id,
    monsterId,
    level: random.number(
      data,
      math.clamp(
        currentMonster.level - constants.GAME_EVENT_BOSS_FIGHT_MIN_LEVEL_DIFFERENCE,
        1,
        Number.MAX_SAFE_INTEGER
      ),
      currentMonster.level + constants.GAME_EVENT_BOSS_FIGHT_MAX_LEVEL_DIFFERENCE
    ),
  }
}