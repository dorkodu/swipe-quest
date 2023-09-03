import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export interface AppStoreState {
  route: "home" | "map" | "inventory" | "menu" | "any";
}

export interface AppStoreAction {

}

const initialState: AppStoreState = {
  route: "any",
}

export const useAppStore = create(
  immer<AppStoreState & AppStoreAction>((_set, _get) => ({
    ...initialState,
  }))
);
