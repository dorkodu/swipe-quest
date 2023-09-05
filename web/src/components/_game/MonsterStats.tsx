import { Card, Flex, Title } from "@mantine/core"
import Emoji from "../Emoji"
import { util } from "@/lib/util";
import { game } from "@core/game";

interface Props {
  level: number;
  hp: number;
  dmg: number;
  spd: number;
}

function MonsterStats({ level, hp, dmg, spd }: Props) {
  return (
    <Flex direction="column" gap="md" w="100%">
      <Flex justify="center" gap="md" wrap="wrap">
        <Flex gap="xs">
          <Emoji emoji="⚡" style={{ width: 24, height: 24 }} />
          <Title order={5}>{`Power: ${game.util.getMonsterPower(hp, dmg, spd)}`}</Title>
        </Flex>
        <Flex gap="xs">
          <Emoji emoji="⭐" style={{ width: 24, height: 24 }} />
          <Title order={5}>{`Level: ${level}`}</Title>
        </Flex>
      </Flex>

      <Flex gap="xs">
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
            <Emoji emoji="👟" style={{ width: 24, height: 24 }} />
            <Title order={5}>{util.formatNumber(spd)}</Title>
          </Flex>
        </Card>
      </Flex>
    </Flex>
  )
}

export default MonsterStats