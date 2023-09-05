import { Button, Flex, Image } from "@mantine/core"
import { IItemData, ItemId, ItemType, amuletData, armorData, itemData, ringData, runeData, weaponData } from "@core/types/item"
import { assets } from "@/assets/assets"
import { useAppStore } from "@/stores/appStore"
import { useGameStore } from "@/stores/gameStore"
import { actionMonsterEquipItem } from "@core/actions/monster_equip_item"
import { InventoryItemImage } from "./InventoryItem"
import { util } from "@/lib/util"

function MonsterItems() {
  const monsterIndex = useGameStore(state => state.data.inventory.currentMonsterIndex);
  const monster = useGameStore(state => state.data.inventory.monsters[monsterIndex]);

  const inventory = useGameStore(state => state.data.inventory);

  const show = (items: { [key in ItemId]?: IItemData }, type: ItemType) => {
    useAppStore.setState(s => {
      s.modals.itemPicker.opened = true;
      s.modals.itemPicker.items = util.sortItems(Object.keys(items).map(v => inventory.items[v as ItemId]).filter(Boolean) as any);
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
            <Image src={assets.url(itemData["Common Axe"].path)} width={32} height={32} style={{ filter: "blur(1px) contrast(50%)" }} /> :
            <InventoryItemImage
              src={assets.url(itemData[monster.weapon].path)}
              stars={itemData[monster.weapon].stars}
            />
          }
        </Button>
      </Flex >

      <Flex direction="row" justify="center" gap="xl">
        <Button variant="default" h="auto" p="md" mr="xl" onClick={() => show(armorData, ItemType.Armor)}>
          {!monster.armor ?
            <Image src={assets.url(itemData["Common Banded Mail 1 Armor"].path)} width={32} height={32} style={{ filter: "blur(1px) contrast(50%)" }} /> :
            <InventoryItemImage
              src={assets.url(itemData[monster.armor].path)}
              stars={itemData[monster.armor].stars}
            />
          }
        </Button>

        <Button variant="default" h="auto" p="md" ml="xl" onClick={() => show(amuletData, ItemType.Amulet)}>
          {!monster.amulet ?
            <Image src={assets.url(itemData["Common Cameo Blue Amulet"].path)} width={32} height={32} style={{ filter: "blur(1px) contrast(50%)" }} /> :
            <InventoryItemImage
              src={assets.url(itemData[monster.amulet].path)}
              stars={itemData[monster.amulet].stars}
            />
          }
        </Button>
      </Flex>

      <Flex direction="row" justify="center" gap="md">
        <Button variant="default" h="auto" p="md" onClick={() => show(runeData, ItemType.Rune)}>
          {!monster.rune ?
            <Image src={assets.url(itemData["Common Generic Rune"].path)} width={32} height={32} style={{ filter: "blur(1px) contrast(50%)" }} /> :
            <InventoryItemImage
              src={assets.url(itemData[monster.rune].path)}
              stars={itemData[monster.rune].stars}
            />
          }
        </Button>

        <Button variant="default" h="auto" p="md" onClick={() => show(ringData, ItemType.Ring)}>
          {!monster.ring ?
            <Image src={assets.url(itemData["Common Agate Ring"].path)} width={32} height={32} style={{ filter: "blur(1px) contrast(50%)" }} /> :
            <InventoryItemImage
              src={assets.url(itemData[monster.ring].path)}
              stars={itemData[monster.ring].stars}
            />
          }
        </Button>
      </Flex>
    </>
  )
}

export default MonsterItems