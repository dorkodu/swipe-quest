import { assets } from "@/assets/assets";
import MonsterStats from "@/components/_game/MonsterStats";
import { useGameStore } from "@/stores/gameStore";
import { game } from "@core/game";
import { monsterData } from "@core/types/monster";
import { Button, Card, Flex, Image, SegmentedControl, Title, createStyles } from "@mantine/core"
import { IconArrowBigUpFilled } from "@tabler/icons-react";
import { useState } from "react";
import MonsterItems from "@/components/_game/MonsterItems";
import Emoji from "@/components/Emoji";
import InventoryItem from "@/components/_game/InventoryItem";
import { itemData } from "@core/types/item";

const useStyles = createStyles((theme) => ({
  inventoryTop: {
    [theme.fn.largerThan(640)]: {
      flex: 1,
    }
  }
}));

function Inventory() {
  return (
    <Flex direction="column" gap="md" mx="md" my={80}>
      <InventoryTop />
      <InventoryBottom />
    </Flex>
  )
}

function InventoryTop() {
  const { classes } = useStyles();

  const [segment, setSegment] = useState("info");

  const data = useGameStore(state => state.data);

  const currentMonsterIndex = data.inventory.currentMonsterIndex;
  const currentMonster = data.inventory.monsters[currentMonsterIndex]
  const currentMonsterSrc = currentMonster ? assets.url(monsterData[currentMonster.id].path) : undefined;
  const currentMonsterStats = currentMonster && game.util.getMonsterStats(currentMonster.id, currentMonster.level);

  return (
    <Flex direction="row" justify="center" gap="md" wrap="wrap">

      <Card withBorder w="100%" className={classes.inventoryTop}>
        <Flex direction="column" align="center" justify="center" gap="md" h="100%">
          <Title order={3}>{currentMonster?.id}</Title>
          <Image src={currentMonsterSrc} width={64} height={64} style={{ imageRendering: "pixelated" }} />
        </Flex>
      </Card>

      <Card withBorder w="100%" className={classes.inventoryTop}>
        <Flex direction="column" gap="md">
          <SegmentedControl fullWidth
            value={segment} onChange={setSegment}
            data={[
              { label: "Info", value: "info" },
              { label: "Items", value: "items" },
            ]}
          />

          {segment === "info" &&
            <>
              <Flex align="center" gap="md" wrap="wrap">
                <Flex gap="xs">
                  <Title order={5}>Cost:</Title>
                  <Emoji emoji="🪙" style={{ width: 24, height: 24 }} />
                  <Title order={5}>123</Title>
                  <Emoji emoji="🍏" style={{ width: 24, height: 24 }} />
                  <Title order={5}>123</Title>
                </Flex>
                <Button leftIcon={<IconArrowBigUpFilled />}>Upgrade</Button>
              </Flex>
              {currentMonsterStats && <MonsterStats {...currentMonsterStats} />}
            </>
          }

          {segment === "items" && <MonsterItems />}
        </Flex>
      </Card>

    </Flex>
  )
}

function InventoryBottom() {
  const [segment, setSegment] = useState("monsters");

  return (
    <>
      <SegmentedControl
        value={segment} onChange={setSegment}
        data={[
          { label: "Monsters", value: "monsters" },
          { label: "Items", value: "items" },
        ]}
      />

      {segment === "monsters" && <MonstersSegment />}
      {segment === "items" && <ItemsSegment />}
    </>
  )
}

function MonstersSegment() {
  const data = useGameStore(state => state.data);

  const changeMonster = (index: number) => {
    useGameStore.setState(s => { s.data.inventory.currentMonsterIndex = index });
  }

  return (
    <>
      <Flex direction="row" gap="md" wrap="wrap">
        {data.inventory.monsters.map((m, i) =>
          <InventoryItem
            key={i}
            src={assets.url(monsterData[m.id].path)}
            count={m.level}
            onClick={() => changeMonster(i)}
            selected={data.inventory.currentMonsterIndex === i}
          />
        )}
      </Flex>
    </>
  )
}

function ItemsSegment() {
  const data = useGameStore(state => state.data);

  return (
    <>
      <Flex direction="row" gap="md" wrap="wrap">
        <InventoryItem emoji="🪙" count={data.player.gold} />
        <InventoryItem emoji="💎" count={data.player.diamond} />
        <InventoryItem emoji="🍏" count={data.player.food} />

        {Object.values(data.inventory.items).map((item, i) =>
          <InventoryItem
            key={i}
            src={assets.url(itemData[item.id].path)}
            count={item.count}
          />
        )}
      </Flex>
    </>
  )
}

export default Inventory