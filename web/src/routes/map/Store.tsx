import { assets } from "@/assets/assets"
import Emoji from "@/components/Emoji"
import { InventoryItem } from "@/components/_game/InventoryItem"
import ItemList from "@/components/_game/ItemList"
import { util } from "@/lib/util"
import { useGameStore } from "@/stores/gameStore"
import { actionStorePurchase } from "@core/actions/store_purchase"
import { itemData } from "@core/types/item"
import { monsterData } from "@core/types/monster"
import { IStoreItem, storeData } from "@core/types/store"
import { Button, Card, Divider, Flex, px, useMantineTheme } from "@mantine/core"

function Store() {
  const theme = useMantineTheme();

  const data = useGameStore(state => state.data);

  const buyable = (item: IStoreItem) => {
    return actionStorePurchase.actable(data, { item });
  }

  const buy = (item: IStoreItem) => {
    if (!buyable(item)) return;
    useGameStore.setState(s => { actionStorePurchase.act(s.data, { item }) });
  }

  return (
    <Flex direction="column" align="center" gap="md" mx="md" my={80}>
      <Card withBorder>
        <Flex direction="column" align="center" gap="md">

          <Flex justify="center" wrap="wrap" gap="md">
            <ItemList gold={data.player.gold} diamond={data.player.diamond} />
          </Flex>

          <Divider w="100%" />

          <Flex direction="row" gap="md" wrap="wrap">
            {storeData.map((s, i) =>
              <Flex direction="column" gap="xs" key={i}>
                <Flex justify="center">
                  {s.itemId &&
                    <InventoryItem
                      src={assets.url(itemData[s.itemId].path)}
                      stars={itemData[s.itemId].stars}
                      count={1}
                      onClick={() => util.showItemInfo({ id: s.itemId!, count: 1 })}
                    />
                  }
                  {s.monsterId &&
                    <InventoryItem
                      src={assets.url(monsterData[s.monsterId].path)}
                      count={1}
                      onClick={() => util.showMonsterInfo({ id: s.monsterId!, level: 1 })}
                    />
                  }
                  {s.gold !== undefined && <ItemList gold={s.gold} />}
                  {s.food !== undefined && <ItemList food={s.food} />}
                </Flex>
                <Button w={100} disabled={!buyable(s)} onClick={() => buy(s)}>
                  <Flex gap={px(theme.spacing.xs) / 2}>
                    {s.cost.gold !== undefined &&
                      <>
                        <Emoji emoji="🪙" />
                        {util.formatNumber(s.cost.gold)}
                      </>
                    }
                    {s.cost.diamond !== undefined &&
                      <>
                        <Emoji emoji="💎" />
                        {util.formatNumber(s.cost.diamond)}
                      </>
                    }
                  </Flex>
                </Button>
              </Flex>
            )}
          </Flex>

        </Flex>
      </Card>
    </Flex>
  )
}

export default Store