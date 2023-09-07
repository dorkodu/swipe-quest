import weapon from "../data/weapon.json";
import amulet from "../data/amulet.json";
import armor from "../data/armor.json";
import ring from "../data/ring.json";
import rune from "../data/rune.json";
import { constants } from "./constants";

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
  stars?: 1 | 2 | 3;

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
function setData(
  data: Record<any, IItemData>,
  source: Record<any, IItemData>,
  type: ItemType,
  modifier: { hp: number, dmg: number, spd: number }
) {
  for (const [key, value] of Object.entries(source)) {
    data[`Common ${key}`] = {
      ...value as any,
      hp: Math.floor(modifier.hp * Math.pow(constants.ITEM_COMMON_MODIFIER, value._id)),
      dmg: Math.floor(modifier.dmg * Math.pow(constants.ITEM_COMMON_MODIFIER, value._id)),
      spd: Math.floor(modifier.spd * Math.pow(constants.ITEM_COMMON_MODIFIER, value._id)),
      stars: 1,
      type,
    };

    data[`Rare ${key}`] = {
      ...value as any,
      hp: Math.floor(modifier.hp * Math.pow(constants.ITEM_RARE_MODIFIER, value._id)),
      dmg: Math.floor(modifier.dmg * Math.pow(constants.ITEM_RARE_MODIFIER, value._id)),
      spd: Math.floor(modifier.spd * Math.pow(constants.ITEM_RARE_MODIFIER, value._id)),
      stars: 2,
      type,
    };

    data[`Legendary ${key}`] = {
      ...value as any,
      hp: Math.floor(modifier.hp * Math.pow(constants.ITEM_LEGENDARY_MODIFIER, value._id)),
      dmg: Math.floor(modifier.dmg * Math.pow(constants.ITEM_LEGENDARY_MODIFIER, value._id)),
      spd: Math.floor(modifier.spd * Math.pow(constants.ITEM_LEGENDARY_MODIFIER, value._id)),
      stars: 3,
      type,
    };
  }
}

setData(
  weaponData,
  weapon,
  ItemType.Weapon,
  {
    hp: constants.ITEM_WEAPON_HP_MODIFIER,
    dmg: constants.ITEM_WEAPON_DMG_MODIFIER,
    spd: constants.ITEM_WEAPON_SPD_MODIFIER
  }
);

setData(
  armorData,
  armor,
  ItemType.Armor,
  {
    hp: constants.ITEM_ARMOR_HP_MODIFIER,
    dmg: constants.ITEM_ARMOR_DMG_MODIFIER,
    spd: constants.ITEM_ARMOR_SPD_MODIFIER
  }
);

setData(
  runeData,
  rune,
  ItemType.Rune,
  {
    hp: constants.ITEM_RUNE_HP_MODIFIER,
    dmg: constants.ITEM_RUNE_DMG_MODIFIER,
    spd: constants.ITEM_RUNE_SPD_MODIFIER
  }
);

setData(
  ringData,
  ring,
  ItemType.Ring,
  {
    hp: constants.ITEM_RING_HP_MODIFIER,
    dmg: constants.ITEM_RING_DMG_MODIFIER,
    spd: constants.ITEM_RING_SPD_MODIFIER
  }
);

setData(
  amuletData,
  amulet,
  ItemType.Amulet,
  {
    hp: constants.ITEM_AMULET_HP_MODIFIER,
    dmg: constants.ITEM_AMULET_DMG_MODIFIER,
    spd: constants.ITEM_AMULET_SPD_MODIFIER
  }
);

export type ItemId = keyof typeof itemData;
export const itemData = {
  ...weaponData,
  ...armorData,
  ...runeData,
  ...ringData,
  ...amuletData,
}

console.log(weaponData)
console.log(armorData)
console.log(runeData)
console.log(ringData)
console.log(amuletData)