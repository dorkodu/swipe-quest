import { useGameStore } from "@/stores/gameStore"
import { Anchor, Button, Card, Flex, Image, Text } from "@mantine/core"
import DorkoduLogo from "@/assets/dorkodu_logo.svg"

function Menu() {
  return (
    <Flex direction="column" align="center" gap="md" mx="md" my={80}>
      <Flex direction="column" align="center" gap="md" w="100%" maw={360}>
        <Button
          onClick={() => useGameStore.getState().reset()}
          variant="default"
          fullWidth
        >
          Reset Progress
        </Button>

        <Card withBorder>
          <Flex direction="column" gap="md" align="center">

            <Anchor href="https://dorkodu.com" align="center">
              <Image
                src={DorkoduLogo}
                alt="Dorkodu"
                draggable={false}
                style={{ width: "75%" }}
                styles={{ root: { margin: "0 auto" } }}
              />
            </Anchor>

            <Text color="dimmed" weight={450}>
              <b>Dorkodu</b> &copy; {new Date().getFullYear()}
            </Text>

          </Flex>
        </Card>

      </Flex>
    </Flex>
  )
}

export default Menu