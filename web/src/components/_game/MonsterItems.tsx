import { Button, Flex, Image } from "@mantine/core"
import { AmuletId, ArmorId, RingId, RuneId, WeaponId, amuletData, armorData, itemData, ringData, runeData, weaponData } from "@core/types/item"
import { assets } from "@/assets/assets"
import { useAppStore } from "@/stores/appStore"
import { useGameStore } from "@/stores/gameStore"
import { actionMonsterEquipItem } from "@core/actions/monster_equip_item"

function MonsterItems() {
  const monster = useGameStore(state => state.data.inventory.monsters[state.data.inventory.currentMonsterIndex]);
  const inventory = useGameStore(state => state.data.inventory);

  const weapon = () => {
    useAppStore.setState(s => {
      s.modals.itemPicker.opened = true;
      s.modals.itemPicker.items = Object.keys(weaponData).map(v => inventory.items[v as WeaponId]).filter(Boolean) as any;
      s.modals.itemPicker.callback = (item) => {
        useAppStore.setState(s => { s.modals.itemPicker.opened = false });
        useGameStore.setState(s => {
          actionMonsterEquipItem.act(
            s.data,
            {
              itemId: item.id,
              monsterIndex: s.data.inventory.currentMonsterIndex,
              slot: "weapon"
            }
          )
        })
      }
    });
  }

  const armor = () => {
    useAppStore.setState(s => {
      s.modals.itemPicker.opened = true;
      s.modals.itemPicker.items = Object.keys(armorData).map(v => inventory.items[v as ArmorId]).filter(Boolean) as any;
      s.modals.itemPicker.callback = (item) => {
        useAppStore.setState(s => { s.modals.itemPicker.opened = false });
        useGameStore.setState(s => {
          actionMonsterEquipItem.act(
            s.data,
            {
              itemId: item.id,
              monsterIndex: s.data.inventory.currentMonsterIndex,
              slot: "armor"
            }
          )
        })
      }
    });
  }

  const rune = () => {
    useAppStore.setState(s => {
      s.modals.itemPicker.opened = true;
      s.modals.itemPicker.items = Object.keys(runeData).map(v => inventory.items[v as RuneId]).filter(Boolean) as any;
      s.modals.itemPicker.callback = (item) => {
        useAppStore.setState(s => { s.modals.itemPicker.opened = false });
        useGameStore.setState(s => {
          actionMonsterEquipItem.act(
            s.data,
            {
              itemId: item.id,
              monsterIndex: s.data.inventory.currentMonsterIndex,
              slot: "rune"
            }
          )
        })
      }
    });
  }

  const ring = () => {
    useAppStore.setState(s => {
      s.modals.itemPicker.opened = true;
      s.modals.itemPicker.items = Object.keys(ringData).map(v => inventory.items[v as RingId]).filter(Boolean) as any;
      s.modals.itemPicker.callback = (item) => {
        useAppStore.setState(s => { s.modals.itemPicker.opened = false });
        useGameStore.setState(s => {
          actionMonsterEquipItem.act(
            s.data,
            {
              itemId: item.id,
              monsterIndex: s.data.inventory.currentMonsterIndex,
              slot: "ring"
            }
          )
        })
      }
    });
  }

  const amulet = () => {
    useAppStore.setState(s => {
      s.modals.itemPicker.opened = true;
      s.modals.itemPicker.items = Object.keys(amuletData).map(v => inventory.items[v as AmuletId]).filter(Boolean) as any;
      s.modals.itemPicker.callback = (item) => {
        useAppStore.setState(s => { s.modals.itemPicker.opened = false });
        useGameStore.setState(s => {
          actionMonsterEquipItem.act(
            s.data,
            {
              itemId: item.id,
              monsterIndex: s.data.inventory.currentMonsterIndex,
              slot: "amulet"
            }
          )
        })
      }
    });
  }

  if (!monster) return null;
  return (
    <>
      <Flex direction="column" align="center">
        <Button variant="default" h="auto" p="md" onClick={weapon}>
          {!monster.weapon ?
            <Image src={assets.url(itemData["Axe"].path)} width={32} height={32} style={{ filter: "blur(1px) contrast(50%)" }} /> :
            <Image src={assets.url(itemData[monster.weapon].path)} width={32} height={32} />
          }
        </Button>
      </Flex>

      <Flex direction="row" justify="center" gap="xl">
        <Button variant="default" h="auto" p="md" mr="xl" onClick={armor}>
          {!monster.armor ?
            <Image src={assets.url(itemData["Banded Mail Armor"].path)} width={32} height={32} style={{ filter: "blur(1px) contrast(50%)" }} /> :
            <Image src={assets.url(itemData[monster.armor].path)} width={32} height={32} />
          }
        </Button>

        <Button variant="default" h="auto" p="md" ml="xl" onClick={amulet}>
          {!monster.amulet ?
            <Image src={assets.url(itemData["Cameo Blue Amulet"].path)} width={32} height={32} style={{ filter: "blur(1px) contrast(50%)" }} /> :
            <Image src={assets.url(itemData[monster.amulet].path)} width={32} height={32} />
          }
        </Button>
      </Flex>

      <Flex direction="row" justify="center" gap="md">
        <Button variant="default" h="auto" p="md" onClick={rune}>
          {!monster.rune ?
            <Image src={assets.url(itemData["Generic Rune"].path)} width={32} height={32} style={{ filter: "blur(1px) contrast(50%)" }} /> :
            <Image src={assets.url(itemData[monster.rune].path)} width={32} height={32} />
          }
        </Button>

        <Button variant="default" h="auto" p="md" onClick={ring}>
          {!monster.ring ?
            <Image src={assets.url(itemData["Agate Ring"].path)} width={32} height={32} style={{ filter: "blur(1px) contrast(50%)" }} /> :
            <Image src={assets.url(itemData[monster.ring].path)} width={32} height={32} />
          }
        </Button>
      </Flex>
    </>
  )
}

export default MonsterItems