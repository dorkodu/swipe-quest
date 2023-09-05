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
  id: ItemId;
  count: number;
}

export interface IItemData {
  _id: number;
  path: string;
  type?: ItemType;
  stars?: number;

  hp?: number;
  dmg?: number;
  spd?: number;
}

type ItemRarity<T extends string> = `Common ${T}` | `Rare ${T}` | `Legendary ${T}`

export const weaponData: Record<ItemRarity<keyof typeof weapon>, IItemData> = {} as any;
export type WeaponId = keyof typeof weaponData;

export const armorData: Record<ItemRarity<keyof typeof armor>, IItemData> = {} as any;
export type ArmorId = keyof typeof armorData;

export const runeData: Record<ItemRarity<keyof typeof rune>, IItemData> = {} as any;
export type RuneId = keyof typeof runeData;

export const ringData: Record<ItemRarity<keyof typeof ring>, IItemData> = {} as any;
export type RingId = keyof typeof ringData;

export const amuletData: Record<ItemRarity<keyof typeof amulet>, IItemData> = {} as any;
export type AmuletId = keyof typeof amuletData;

// TODO: Fix types
function setData(data: Record<any, IItemData>, source: Record<any, IItemData>) {
  for (const [key, value] of Object.entries(source)) {
    data[`Common ${key}`] = {
      ...value as any,
      hp: value._id,
      dmg: value._id,
      spd: value._id,
      stars: 1,
    };

    data[`Rare ${key}`] = {
      ...value as any,
      hp: value._id * 2,
      dmg: value._id * 2,
      spd: value._id * 2,
      stars: 2,
    };

    data[`Legendary ${key}`] = {
      ...value as any,
      hp: value._id * 3,
      dmg: value._id * 3,
      spd: value._id * 3,
      stars: 3,
    };
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