export interface IMonster {
  name: string;
  baseHp: number;
  baseDmg: number;
  baseSpd: number;
}

export enum MonsterId {
  None = "None",

  Angel = "Angel",
  DeathKnight = "Death Knight",
  DeepDwarf = "Deep Dwarf",
  Jelly = "Jelly",
  Ogre = "Ogre",
  Phoenix = "Phoenix",
  Raven = "Raven",
  FreedSlave = "Freed Slave",
  StoneGiant = "Stone Giant",
  Wizard = "Wizard",
}