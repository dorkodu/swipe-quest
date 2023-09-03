import { MonsterId } from "./monster"

export type GameEventId = keyof IGameEvent;
export interface IGameEvent {
  item: {
    id: "item",
  }

  gold: {
    id: "gold",
    count: number,
  }

  diamond: {
    id: "diamond",
    count: number,
  }

  monster_fight: {
    id: "monster_fight",
    monsterId: MonsterId,
    level: number,
  }

  monster_unlock: {
    id: "monster_unlock",
    monsterId: MonsterId,
  }

  mystery_box: {
    id: "mystery_box",
  }

  scratch_card: {
    id: "scratch_card",
  }

  experience: {
    id: "experience",
    count: number,
  }

  food: {
    id: "food",
    count: number,
  }

  boss_fight: {
    id: "boss_fight",
    monsterId: MonsterId,
    level: number,
  }
}