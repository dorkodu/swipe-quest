import weapon from "../data/weapon.json";
import amulet from "../data/amulet.json";
import armor from "../data/armor.json";
import ring from "../data/ring.json";
import rune from "../data/rune.json";

export type WeaponId = keyof typeof weapon;
export const weaponData: Record<WeaponId, IWeapon> = weapon;
export interface IWeapon {
  path: string | null;
}

export type ArmorId = keyof typeof armor;
export const armorData: Record<ArmorId, IArmor> = armor;
export interface IArmor {
  path: string | null;
}

export type RuneId = keyof typeof rune;
export const runeData: Record<RuneId, IRune> = rune;
export interface IRune {
  path: string | null;
}

export type RingId = keyof typeof ring;
export const ringData: Record<RingId, IRing> = ring;
export interface IRing {
  path: string | null;
}

export type AmuletId = keyof typeof amulet;
export const amuletData: Record<AmuletId, IAmulet> = amulet;
export interface IAmulet {
  path: string | null;
}

export type ItemId = keyof typeof itemData;
export const itemData = {
  ...weaponData,
  ...armorData,
  ...runeData,
  ...ringData,
  ...amuletData,
}