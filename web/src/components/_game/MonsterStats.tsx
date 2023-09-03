import { Card, Flex, Title } from "@mantine/core"
import Emoji from "../Emoji"
import { util } from "@/lib/util";

interface Props {
  level: number;
  hp: number;
  dmg: number;
  spd: number;
}

function MonsterStats({ level, hp, dmg, spd }: Props) {
  return (
    <Flex w="100%" gap="xs">
      <Card withBorder style={{ flex: 1 }}>
        <Flex direction="column" align="center">
          <Emoji emoji="⭐" style={{ width: 24, height: 24 }} />
          <Title order={5}>{level}</Title>
        </Flex>
      </Card>
      <Card withBorder style={{ flex: 1 }}>
        <Flex direction="column" align="center">
          <Emoji emoji="❤" style={{ width: 24, height: 24 }} />
          <Title order={5}>{util.formatNumber(hp)}</Title>
        </Flex>
      </Card>
      <Card withBorder style={{ flex: 1 }}>
        <Flex direction="column" align="center">
          <Emoji emoji="⚔" style={{ width: 24, height: 24 }} />
          <Title order={5}>{util.formatNumber(dmg)}</Title>
        </Flex>
      </Card>
      <Card withBorder style={{ flex: 1 }}>
        <Flex direction="column" align="center">
          <Emoji emoji="⚡" style={{ width: 24, height: 24 }} />
          <Title order={5}>{util.formatNumber(spd)}</Title>
        </Flex>
      </Card>
    </Flex>
  )
}

export default MonsterStats