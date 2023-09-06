import { assets } from "@/assets/assets"
import MonsterStats from "@/components/_game/MonsterStats"
import { monsterData } from "@core/types/monster"
import { Button, Card, Flex, Image, Title } from "@mantine/core"
import { IconSword } from "@tabler/icons-react"

function Campaign() {
  return (
    <Flex direction="column" gap="md" mx="md" my={80}>
      <Card withBorder w="100%" >
        <Flex direction="column" align="center" gap="md">
          <Image src={assets.url(monsterData[event.monsterId].path)} width={64} height={64} style={{ imageRendering: "pixelated" }} />
          <Title order={3} align="center">{event.monsterId}</Title>
          <MonsterStats {...stats} />
          <Button fullWidth leftIcon={<IconSword />} onClick={fight}>Fight</Button>
        </Flex>
      </Card>
    </Flex>
  )
}

export default Campaign