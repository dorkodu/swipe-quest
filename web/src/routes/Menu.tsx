import { useGameStore } from "@/stores/gameStore"
import { Button, Flex } from "@mantine/core"

function Menu() {
  return (
    <Flex direction="column" gap="md" mx="md" my={80}>
      <Button
        onClick={() => useGameStore.getState().reset()}
        variant="default"
      >
        Reset Progress
      </Button>
    </Flex>
  )
}

export default Menu