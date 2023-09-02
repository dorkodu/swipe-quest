import item from "../data/item.json";

export interface IItem {
  path: string;
}

export type ItemId = keyof typeof item;
export const itemData: Record<ItemId, IItem> = item;