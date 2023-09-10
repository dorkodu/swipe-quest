import { assets } from "@/assets/assets";
import { InventoryItem } from "@/components/_game/InventoryItem";
import ItemList from "@/components/_game/ItemList";
import { useGameStore } from "@/stores/gameStore"
import { actionItemUpgrade } from "@core/actions/item_upgrade";
import { game } from "@core/game";
import { ItemId, itemData } from "@core/types/item";
import { Button, Card, Flex, Title } from "@mantine/core"
import { IconArrowBigRightFilled, IconHammer } from "@tabler/icons-react";
import { useMemo, useState } from "react";

function Blacksmith() {
  const data = useGameStore(state => state.data);
  const items = useMemo(() => game.util.sortItems(Object.values(data.inventory.items)), [data.inventory.items]);

  const [itemId, setItemId] = useState<ItemId | undefined>(undefined);
  const upgradedId = game.util.getItemUpgrade(itemId);

  const upgrade = () => {
    useGameStore.setState(s => {
      if (!itemId) return;
      actionItemUpgrade.act(s.data, { itemId });
    })
  }

  return (
    <Flex direction="column" align="center" gap="md" mx="md" my={80}>
      <Card withBorder w="100%" maw={360}>
        <Flex direction="column" gap="md">

          <Card withBorder>
            <Flex direction="column" gap="md">

              <Flex align="center" justify="space-evenly">
                {!itemId ?
                  <InventoryItem src={assets.url(itemData["Common Axe"].path)} blur /> :
                  <InventoryItem
                    src={assets.url(itemData[itemId].path)}
                    count={data.inventory.items[itemId]?.count}
                    stars={itemData[itemId].stars}
                    onClick={() => setItemId(undefined)}
                  />
                }
                <Flex pos="relative">
                  <IconArrowBigRightFilled />
                  <Title order={6} pos="absolute" top={24}>
                    {itemId ? `${data.inventory.items[itemId]?.count}/3` : `0/3`}
                  </Title>
                </Flex>
                {!upgradedId ?
                  <InventoryItem src={assets.url(itemData["Common Axe"].path)} blur /> :
                  <InventoryItem
                    src={assets.url(itemData[upgradedId].path)}
                    count={data.inventory.items[upgradedId]?.count}
                    stars={itemData[upgradedId].stars}
                  />
                }
              </Flex>

              <Button
                leftIcon={<IconHammer />}
                onClick={upgrade}
                disabled={!actionItemUpgrade.actable(data, { itemId })}
              >
                Upgrade
              </Button>

            </Flex>
          </Card>

          <Flex direction="row" gap="md" wrap="wrap">
            <ItemList items={items} itemsOnClick={(item) => setItemId(item.id)} />
          </Flex>

        </Flex>
      </Card>
    </Flex>
  )
}

export default Blacksmith