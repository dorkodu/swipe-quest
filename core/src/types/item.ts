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

  hp?: number;
  dmg?: number;
  spd?: number;
}

export type WeaponId = keyof typeof weapon;
export const weaponData: Record<WeaponId, IItem> = weapon;

export type ArmorId = keyof typeof armor;
export const armorData: Record<ArmorId, IItem> = armor;

export type RuneId = keyof typeof rune;
export const runeData: Record<RuneId, IItem> = rune;

export type RingId = keyof typeof ring;
export const ringData: Record<RingId, IItem> = ring;

export type AmuletId = keyof typeof amulet;
export const amuletData: Record<AmuletId, IItem> = amulet;

export type ItemId = keyof typeof itemData;
export const itemData = {
  ...weaponData,
  ...armorData,
  ...runeData,
  ...ringData,
  ...amuletData,
}