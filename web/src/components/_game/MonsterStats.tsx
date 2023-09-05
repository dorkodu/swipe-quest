import { Flex, Title } from "@mantine/core"
import Emoji from "../Emoji"
import { util } from "@/lib/util";
import { game } from "@core/game";
import Stats from "./Stats";

interface Props {
  level: number;
  hp: number;
  dmg: number;
  spd: number;
}

function MonsterStats({ level, hp, dmg, spd }: Props) {
  const power = game.util.getMonsterPower(hp, dmg, spd);

  return (
    <Flex direction="column" gap="md" w="100%">
      <Flex gap="md" wrap="wrap">
        <Flex gap="xs">
          <Emoji emoji="⚡" style={{ width: 24, height: 24 }} />
          <Title order={5}>{`Power: ${util.formatNumber(power)}`}</Title>
        </Flex>
        <Flex gap="xs">
          <Emoji emoji="⭐" style={{ width: 24, height: 24 }} />
          <Title order={5}>{`Level: ${level}`}</Title>
        </Flex>
      </Flex>

      <Stats hp={hp} dmg={dmg} spd={spd} />
    </Flex>
  )
}

export default MonsterStats