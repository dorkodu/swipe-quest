import { Card, Flex } from "@mantine/core"

function Store() {
  return (
    <Flex direction="column" align="center" gap="md" mx="md" my={80}>
      <Card withBorder w="100%" maw={360}>
        <Flex direction="column" align="center" gap="md">
          store
        </Flex>
      </Card>
    </Flex>
  )
}

export default Store