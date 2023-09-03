import { Button, Flex } from "@mantine/core"
import Emoji from "../Emoji"

function MonsterItems() {
  return (
    <>
      <Flex direction="column" align="center">
        <Button variant="default" h="auto" p="md">
          <Emoji emoji="⭐" style={{ width: 32, height: 32 }} />
        </Button>
      </Flex>

      <Flex direction="row" justify="center" gap="xl">
        <Button variant="default" h="auto" p="md" mr="xl">
          <Emoji emoji="⭐" style={{ width: 32, height: 32 }} />
        </Button>

        <Button variant="default" h="auto" p="md" ml="xl">
          <Emoji emoji="⭐" style={{ width: 32, height: 32 }} />
        </Button>
      </Flex>

      <Flex direction="row" justify="center" gap="md">
        <Button variant="default" h="auto" p="md">
          <Emoji emoji="⭐" style={{ width: 32, height: 32 }} />
        </Button>

        <Button variant="default" h="auto" p="md">
          <Emoji emoji="⭐" style={{ width: 32, height: 32 }} />
        </Button>
      </Flex>
    </>
  )
}

export default MonsterItems