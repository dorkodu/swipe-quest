import { ItemId } from "@core/types/item";
import { IInventory } from "@core/types/types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export interface AppStoreState {
  route: "home" | "map" | "inventory" | "menu" | "any";

  modals: {
    itemPicker: {
      opened: boolean,
      items: Array<Exclude<IInventory["items"][ItemId], undefined>>,
      callback?: (item: Exclude<IInventory["items"][ItemId], undefined>) => void,
    },
  }
}

export interface AppStoreAction {

}

const initialState: AppStoreState = {
  route: "any",

  modals: {
    itemPicker: {
      opened: false,
      items: [],
      callback: undefined,
    },
  }
}

export const useAppStore = create(
  immer<AppStoreState & AppStoreAction>((_set, _get) => ({
    ...initialState,
  }))
);
