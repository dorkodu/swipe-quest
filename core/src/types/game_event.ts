import { MonsterId } from "./monster_id"

export type IGameEvent =
  {
    id: "item",
  }
  |
  {
    id: "gold",
    count: number,
  }
  |
  {
    id: "diamond",
    count: number,
  }
  |
  {
    id: "monster_fight",
    monsterId: MonsterId,
  }
  |
  {
    id: "monster_unlock",
    monsterId: MonsterId,
  }
  |
  {
    id: "mystery_box",
  }
  |
  {
    id: "scratch_card",
  }
  |
  {
    id: "experience",
    count: number,
  }
  |
  {
    id: "food",
  }
  |
  {
    id: "boss_fight",
    monsterId: MonsterId,
  }