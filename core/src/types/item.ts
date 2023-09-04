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

export type _WeaponId = keyof typeof weapon;
export const weaponData: Record<`Common ${_WeaponId}` | `Rare ${_WeaponId}` | `Legendary ${_WeaponId}`, IItem> = {} as any;
export type WeaponId = keyof typeof weaponData;

export type _ArmorId = keyof typeof armor;
export const armorData: Record<`Common ${_ArmorId}` | `Rare ${_ArmorId}` | `Legendary ${_ArmorId}`, IItem> = {} as any;
export type ArmorId = keyof typeof armorData;

export type _RuneId = keyof typeof rune;
export const runeData: Record<`Common ${_RuneId}` | `Rare ${_RuneId}` | `Legendary ${_RuneId}`, IItem> = {} as any;
export type RuneId = keyof typeof runeData;

export type _RingId = keyof typeof ring;
export const ringData: Record<`Common ${_RingId}` | `Rare ${_RingId}` | `Legendary ${_RingId}`, IItem> = {} as any;
export type RingId = keyof typeof ringData;

export type _AmuletId = keyof typeof amulet;
export const amuletData: Record<`Common ${_AmuletId}` | `Rare ${_AmuletId}` | `Legendary ${_AmuletId}`, IItem> = {} as any;
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