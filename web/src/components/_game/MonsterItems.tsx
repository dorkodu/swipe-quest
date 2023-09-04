import { Button, Flex, Image } from "@mantine/core"
import { IItem, ItemId, ItemType, amuletData, armorData, itemData, ringData, runeData, weaponData } from "@core/types/item"
import { assets } from "@/assets/assets"
import { useAppStore } from "@/stores/appStore"
import { useGameStore } from "@/stores/gameStore"
import { actionMonsterEquipItem } from "@core/actions/monster_equip_item"

function MonsterItems() {
  const monsterIndex = useGameStore(state => state.data.inventory.currentMonsterIndex);
  const monster = useGameStore(state => state.data.inventory.monsters[monsterIndex]);

  const inventory = useGameStore(state => state.data.inventory);

  const show = (items: { [key in ItemId]?: IItem }, type: ItemType) => {
    useAppStore.setState(s => {
      s.modals.itemPicker.opened = true;
      s.modals.itemPicker.items = Object.keys(items).map(v => inventory.items[v as ItemId]).filter(Boolean) as any;
      if (monster && monster[type]) s.modals.itemPicker.items.push(undefined);
      s.modals.itemPicker.callback = (item) => {
        useAppStore.setState(s => { s.modals.itemPicker.opened = false });
        useGameStore.setState(s => { actionMonsterEquipItem.act(s.data, { itemId: item?.id, monsterIndex, type }) })
      }
    });
  }

  if (!monster) return null;
  return (
    <>
      <Flex direction="column" align="center">
        <Button variant="default" h="auto" p="md" onClick={() => show(weaponData, ItemType.Weapon)}>
          {!monster.weapon ?
            <Image src={assets.url(itemData["Axe"].path)} width={32} height={32} style={{ filter: "blur(1px) contrast(50%)" }} /> :
            <Image src={assets.url(itemData[monster.weapon].path)} width={32} height={32} />
          }
        </Button>
      </Flex >

      <Flex direction="row" justify="center" gap="xl">
        <Button variant="default" h="auto" p="md" mr="xl" onClick={() => show(armorData, ItemType.Armor)}>
          {!monster.armor ?
            <Image src={assets.url(itemData["Banded Mail Armor"].path)} width={32} height={32} style={{ filter: "blur(1px) contrast(50%)" }} /> :
            <Image src={assets.url(itemData[monster.armor].path)} width={32} height={32} />
          }
        </Button>

        <Button variant="default" h="auto" p="md" ml="xl" onClick={() => show(amuletData, ItemType.Amulet)}>
          {!monster.amulet ?
            <Image src={assets.url(itemData["Cameo Blue Amulet"].path)} width={32} height={32} style={{ filter: "blur(1px) contrast(50%)" }} /> :
            <Image src={assets.url(itemData[monster.amulet].path)} width={32} height={32} />
          }
        </Button>
      </Flex>

      <Flex direction="row" justify="center" gap="md">
        <Button variant="default" h="auto" p="md" onClick={() => show(runeData, ItemType.Rune)}>
          {!monster.rune ?
            <Image src={assets.url(itemData["Generic Rune"].path)} width={32} height={32} style={{ filter: "blur(1px) contrast(50%)" }} /> :
            <Image src={assets.url(itemData[monster.rune].path)} width={32} height={32} />
          }
        </Button>

        <Button variant="default" h="auto" p="md" onClick={() => show(ringData, ItemType.Ring)}>
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