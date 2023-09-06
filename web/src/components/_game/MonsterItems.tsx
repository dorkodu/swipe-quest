import { Button, Flex, Image, Indicator } from "@mantine/core"
import { IItemData, ItemId, ItemType, amuletData, armorData, itemData, ringData, runeData, weaponData } from "@core/types/item"
import { assets } from "@/assets/assets"
import { useAppStore } from "@/stores/appStore"
import { useGameStore } from "@/stores/gameStore"
import { actionMonsterEquipItem } from "@core/actions/monster_equip_item"
import { InventoryItemImage } from "./InventoryItem"
import { game } from "@core/game"

function MonsterItems() {
  const monsterIndex = useGameStore(state => state.data.inventory.currentMonsterIndex);
  const monster = useGameStore(state => state.data.inventory.monsters[monsterIndex]);

  const inventory = useGameStore(state => state.data.inventory);

  const show = (items: { [key in ItemId]?: IItemData }, type: ItemType) => {
    useAppStore.setState(s => {
      s.modals.itemPicker.opened = true;
      s.modals.itemPicker.items = game.util.sortItems(Object.keys(items).map(v => inventory.items[v as ItemId]).filter(Boolean) as any);
      if (monster && monster[type]) s.modals.itemPicker.items.push(undefined);
      s.modals.itemPicker.callback = (item) => {
        useAppStore.setState(s => { s.modals.itemPicker.opened = false });
        useGameStore.setState(s => { actionMonsterEquipItem.act(s.data, { itemId: item?.id, monsterIndex, type }) })
      }
    });
  }

  const autoEquip = () => {
    const betterWeapon = game.util.getBetterItem(inventory, weaponData);
    const betterArmor = game.util.getBetterItem(inventory, armorData);
    const betterRune = game.util.getBetterItem(inventory, runeData);
    const betterRing = game.util.getBetterItem(inventory, ringData);
    const betterAmulet = game.util.getBetterItem(inventory, amuletData);

    useGameStore.setState(s => {
      if (betterWeapon) actionMonsterEquipItem.act(s.data, { itemId: betterWeapon, type: ItemType.Weapon, monsterIndex });
      if (betterArmor) actionMonsterEquipItem.act(s.data, { itemId: betterArmor, type: ItemType.Armor, monsterIndex });
      if (betterRune) actionMonsterEquipItem.act(s.data, { itemId: betterRune, type: ItemType.Rune, monsterIndex });
      if (betterRing) actionMonsterEquipItem.act(s.data, { itemId: betterRing, type: ItemType.Ring, monsterIndex });
      if (betterAmulet) actionMonsterEquipItem.act(s.data, { itemId: betterAmulet, type: ItemType.Amulet, monsterIndex });
    })
  }

  const unequip = () => {
    useGameStore.setState(s => {
      actionMonsterEquipItem.act(s.data, { itemId: undefined, type: ItemType.Weapon, monsterIndex });
      actionMonsterEquipItem.act(s.data, { itemId: undefined, type: ItemType.Armor, monsterIndex });
      actionMonsterEquipItem.act(s.data, { itemId: undefined, type: ItemType.Rune, monsterIndex });
      actionMonsterEquipItem.act(s.data, { itemId: undefined, type: ItemType.Ring, monsterIndex });
      actionMonsterEquipItem.act(s.data, { itemId: undefined, type: ItemType.Amulet, monsterIndex });
    })
  }

  if (!monster) return null;
  return (
    <>
      <Flex direction="column" align="center">
        <Indicator color="red" disabled={!game.util.getBetterItem(inventory, weaponData)}>
          <Button variant="default" h="auto" p="md" onClick={() => show(weaponData, ItemType.Weapon)}>
            {!monster.weapon ?
              <Image src={assets.url(itemData["Common Axe"].path)} width={32} height={32} style={{ filter: "blur(1px) contrast(50%)" }} /> :
              <InventoryItemImage
                src={assets.url(itemData[monster.weapon].path)}
                stars={itemData[monster.weapon].stars}
              />
            }
          </Button>
        </Indicator>
      </Flex>

      <Flex direction="row" justify="center" gap="xl">
        <Indicator color="red" disabled={!game.util.getBetterItem(inventory, armorData)} mr="xl">
          <Button variant="default" h="auto" p="md" onClick={() => show(armorData, ItemType.Armor)}>
            {!monster.armor ?
              <Image src={assets.url(itemData["Common Banded Mail 1 Armor"].path)} width={32} height={32} style={{ filter: "blur(1px) contrast(50%)" }} /> :
              <InventoryItemImage
                src={assets.url(itemData[monster.armor].path)}
                stars={itemData[monster.armor].stars}
              />
            }
          </Button>
        </Indicator>

        <Indicator color="red" disabled={!game.util.getBetterItem(inventory, amuletData)}>
          <Button variant="default" h="auto" p="md" ml="xl" onClick={() => show(amuletData, ItemType.Amulet)}>
            {!monster.amulet ?
              <Image src={assets.url(itemData["Common Cameo Blue Amulet"].path)} width={32} height={32} style={{ filter: "blur(1px) contrast(50%)" }} /> :
              <InventoryItemImage
                src={assets.url(itemData[monster.amulet].path)}
                stars={itemData[monster.amulet].stars}
              />
            }
          </Button>
        </Indicator>
      </Flex>

      <Flex direction="row" justify="center" gap="md">
        <Indicator color="red" disabled={!game.util.getBetterItem(inventory, runeData)}>
          <Button variant="default" h="auto" p="md" onClick={() => show(runeData, ItemType.Rune)}>
            {!monster.rune ?
              <Image src={assets.url(itemData["Common Generic Rune"].path)} width={32} height={32} style={{ filter: "blur(1px) contrast(50%)" }} /> :
              <InventoryItemImage
                src={assets.url(itemData[monster.rune].path)}
                stars={itemData[monster.rune].stars}
              />
            }
          </Button>
        </Indicator>

        <Indicator color="red" disabled={!game.util.getBetterItem(inventory, ringData)}>
          <Button variant="default" h="auto" p="md" onClick={() => show(ringData, ItemType.Ring)}>
            {!monster.ring ?
              <Image src={assets.url(itemData["Common Agate Ring"].path)} width={32} height={32} style={{ filter: "blur(1px) contrast(50%)" }} /> :
              <InventoryItemImage
                src={assets.url(itemData[monster.ring].path)}
                stars={itemData[monster.ring].stars}
              />
            }
          </Button>
        </Indicator>
      </Flex>

      <Flex direction="row" gap="md">
        <Button onClick={autoEquip} style={{ flex: 1 }}>Auto-equip</Button>
        <Button onClick={unequip} style={{ flex: 1 }} color="red">Unequip</Button>
      </Flex>
    </>
  )
}

export default MonsterItems