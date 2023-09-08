import store from "../data/store.json";
import { ItemId } from "./item";
import { MonsterId } from "./monster";

export interface IStoreItem {
  itemId?: ItemId;
  monsterId?: MonsterId;
  gold?: number;
  food?: number;

  cost: {
    gold?: number;
    diamond?: number;
  }
}

export const storeData: Array<IStoreItem> = store as any;