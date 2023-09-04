import weapon from "../data/weapon.json";
import amulet from "../data/amulet.json";
import armor from "../data/armor.json";
import ring from "../data/ring.json";
import rune from "../data/rune.json";

export enum ItemType {
  Weapon = "weapon",
  Armor = "armor",
  Rune = "rune",
  Ring = "ring",
  Amulet = "amulet",
}

export interface IItem {
  path: string;
  type?: ItemType;
  stars?: number;

  hp?: number;
  dmg?: number;
  spd?: number;
}

type IItemId<T extends string> = `Common ${T}` | `Rare ${T}` | `Legendary ${T}`

export const weaponData: Record<IItemId<keyof typeof weapon>, IItem> = {} as any;
export type WeaponId = keyof typeof weaponData;

export const armorData: Record<IItemId<keyof typeof armor>, IItem> = {} as any;
export type ArmorId = keyof typeof armorData;

export const runeData: Record<IItemId<keyof typeof rune>, IItem> = {} as any;
export type RuneId = keyof typeof runeData;

export const ringData: Record<IItemId<keyof typeof ring>, IItem> = {} as any;
export type RingId = keyof typeof ringData;

export const amuletData: Record<IItemId<keyof typeof amulet>, IItem> = {} as any;
export type AmuletId = keyof typeof amuletData;

function setData(data: any, source: any) {
  for (const [key, value] of Object.entries(source)) {
    data[`Common ${key}`] = value;
    data[`Rare ${key}`] = value;
    data[`Legendary ${key}`] = value;
  }
}

setData(weaponData, weapon);
setData(armorData, armor);
setData(runeData, rune);
setData(ringData, ring);
setData(amuletData, amulet);

export type ItemId = keyof typeof itemData;
export const itemData = {
  ...weaponData,
  ...armorData,
  ...runeData,
  ...ringData,
  ...amuletData,
}