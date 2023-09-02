import { MonsterId } from "@core/types/monster";

import angel from "@/assets/monsters/angel.png";
import death_knigth from "@/assets/monsters/death_knigth.png";
import deep_dwarf from "@/assets/monsters/deep_dwarf.png";
import jelly from "@/assets/monsters/jelly.png";
import ogre from "@/assets/monsters/ogre_new.png";
import phoenix from "@/assets/monsters/phoenix.png";
import raven from "@/assets/monsters/raven.png";
import slave_freed from "@/assets/monsters/slave_freed.png";
import stone_giant_new from "@/assets/monsters/stone_giant_new.png";
import wizard from "@/assets/monsters/wizard.png";

function monsterIdToSrc(id: MonsterId) {
  switch (id) {
    case MonsterId.Angel: return angel;
    case MonsterId.DeathKnight: return death_knigth;
    case MonsterId.DeepDwarf: return deep_dwarf;
    case MonsterId.Jelly: return jelly;
    case MonsterId.Ogre: return ogre;
    case MonsterId.Phoenix: return phoenix;
    case MonsterId.Raven: return raven;
    case MonsterId.FreedSlave: return slave_freed;
    case MonsterId.StoneGiant: return stone_giant_new;
    case MonsterId.Wizard: return wizard;
    default: return undefined;
  }
}

export const assets = {
  monsterIdToSrc,
}