import { useGameStore } from "@/stores/gameStore"
import { Anchor, Button, Card, Flex, Image, Text } from "@mantine/core"
import DorkoduLogo from "@/assets/dorkodu_logo.svg"
import { IconTrash } from "@tabler/icons-react"
import { useState } from "react"

function Menu() {
  const [confirm, setConfirm] = useState(false);

  return (
    <Flex direction="column" align="center" gap="md" mx="md" my={80}>
      <Flex direction="column" align="center" gap="md" w="100%" maw={360}>
        <Button
          onClick={() => { confirm ? useGameStore.getState().reset() : setConfirm(true) }}
          color={confirm ? "red" : undefined}
          variant={confirm ? undefined : "default"}
          leftIcon={<IconTrash />}
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