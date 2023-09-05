import { Card, Flex, Title } from "@mantine/core"
import Emoji from "../Emoji"
import { util } from "@/lib/util"

interface Props {
  hp: number;
  dmg: number;
  spd: number;
}

function Stats({ hp, dmg, spd }: Props) {
  return (
    <Flex gap="xs" w="100%">
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
  )
}

export default Stats