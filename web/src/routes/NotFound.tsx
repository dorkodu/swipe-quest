import { assets } from "@/assets/assets"
import { monsterData } from "@core/types/monster"
import { Button, Card, Flex, Image, Title } from "@mantine/core"
import { IconRun } from "@tabler/icons-react"
import { useNavigate } from "react-router-dom"

function NotFound() {
  const navigate = useNavigate();

  return (
    <Flex direction="column" align="center" gap="md" mx="md" my={80}>
      <Card withBorder w="100%" maw={360}>
        <Flex direction="column" align="center" gap="md">

          <Title order={2}>Halt ye scum!</Title>
          <Image
            src={assets.url(monsterData["Death Knight"].path)} width={150} height={150}
            style={{ imageRendering: "pixelated" }}
          />
          <Button
            leftIcon={<IconRun />}
            onClick={() => navigate("/home")}
            w="100%"
            color="red"
          >
            Run
          </Button>

        </Flex>
      </Card>
    </Flex>
  )
}

export default NotFound