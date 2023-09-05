import { ItemId } from "@core/types/item";
import { IInventory } from "@core/types/types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export interface AppStoreState {
  route: "home" | "map" | "inventory" | "menu" | "any";

  segments: {
    inventoryTop: "info" | "items",
    inventoryBottom: "monsters" | "items",
  }

  modals: {
    itemPicker: {
      opened: boolean,
      items: Array<IInventory["items"][ItemId]>,
      callback?: (item: IInventory["items"][ItemId]) => void,
    },
    itemInfo: {
      opened: boolean,
      item?: IInventory["items"][ItemId],
      other?: {
        name: "level" | "gold" | "diamond" | "food",
        text: string,
      }
    },
    monsterFight: {
      opened: boolean,
    },
    updateSW: {
      opened: boolean,
    }
  }
}

export interface AppStoreAction {

}

const initialState: AppStoreState = {
  route: "any",

  segments: {
    inventoryTop: "info",
    inventoryBottom: "monsters",
  },

  modals: {
    itemPicker: {
      opened: false,
      items: [],
      callback: undefined,
    },

    itemInfo: {
      opened: false,
      item: undefined,
    },

    monsterFight: {
      opened: false,
    },

    updateSW: {
      opened: false,
    }
  }
}

export const useAppStore = create(
  immer<AppStoreState & AppStoreAction>((_set, _get) => ({
    ...initialState,
  }))
);
