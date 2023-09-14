import { useGameStore } from "@/stores/gameStore"
import { Anchor, Button, Card, Flex, Image, Text, Title } from "@mantine/core"
import DorkoduLogo from "@/assets/dorkodu_logo.svg"
import { IconTrash } from "@tabler/icons-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Menu() {
  const navigate = useNavigate();
  const [confirm, setConfirm] = useState(false);

  return (
    <Flex direction="column" align="center" gap="md" mx="md" my={80}>
      <Flex direction="column" align="center" gap="md" w="100%" maw={360}>
        <Button
          onClick={() => {
            if (confirm) {
              useGameStore.getState().reset();
              navigate("/home");
            }
            setConfirm(!confirm)
          }}
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

            <Title order={5} align="center">SwipeQuest v0.1.2</Title>

          </Flex>
        </Card>

      </Flex>
    </Flex>
  )
}

export default Menu