import { assets } from "@/assets/assets";
import MonsterStats from "@/components/_game/MonsterStats";
import { useGameStore } from "@/stores/gameStore";
import { textShadow } from "@/styles/css";
import { game } from "@core/game";
import { monsterData } from "@core/types/monster";
import { Button, Card, Flex, Image, SegmentedControl, Title } from "@mantine/core"
import { IconArrowBigUpFilled } from "@tabler/icons-react";
import { useState } from "react";
import { useMediaQuery } from "@mantine/hooks";
import MonsterItems from "@/components/_game/MonsterItems";
import Emoji from "@/components/Emoji";

function Inventory() {
  return (
    <Flex direction="column" gap="md" mx="md" my={80}>
      <InventoryTop />
      <InventoryBottom />
    </Flex>
  )
}

function InventoryTop() {
  const matches = useMediaQuery("(min-width: 640px)");

  const [segment, setSegment] = useState("info");

  const data = useGameStore(state => state.data);

  const currentMonsterIndex = data.inventory.currentMonsterIndex;
  const currentMonster = data.inventory.monsters[currentMonsterIndex]
  const currentMonsterSrc = currentMonster ? assets.url(monsterData[currentMonster.id].path) : undefined;
  const currentMonsterStats = currentMonster && game.util.getMonsterStats(currentMonster.id, currentMonster.level);

  return (
    <Flex direction="row" justify="center" gap="md" wrap="wrap">

      <Card withBorder w="100%" style={matches ? { flex: 1 } : {}}>
        <Flex direction="column" align="center" justify="center" gap="md" h="100%">
          <Title order={3}>{currentMonster?.id}</Title>
          <Image src={currentMonsterSrc} width={64} height={64} style={{ imageRendering: "pixelated" }} />
        </Flex>
      </Card>

      <Card withBorder w="100%" style={matches ? { flex: 1 } : {}}>
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
          <Button key={i}
            variant={data.inventory.currentMonsterIndex === i ? "filled" : "default"}
            h="auto" p="md" onClick={() => changeMonster(i)}
          >
            <Image src={assets.url(monsterData[m.id].path)} width={64} height={64} style={{ imageRendering: "pixelated" }} />
            <Title order={4} pos="absolute" right={8} bottom={8} color="white" style={textShadow}>{m.level}</Title>
          </Button>
        )}
      </Flex>
    </>
  )
}

function ItemsSegment() {
  return (
    <>items</>
  )
}

export default Inventory