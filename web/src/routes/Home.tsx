import { ActionIcon, Card, Flex, Title, useMantineTheme } from "@mantine/core"
import { IconArrowLeft, IconBackpack, IconHome, IconMap, IconMenu2 } from "@tabler/icons-react";

function Home() {
  const theme = useMantineTheme();

  return (
    <>
      <Flex pos="fixed" maw={theme.breakpoints.sm} w="100%" h={48} top={0} style={{ zIndex: 1000, background: theme.colors.dark[7] }}>
        <Card withBorder m="md" w="100%" h="100%">
          <Flex h="100%" direction="row" align="center" justify="space-between">
            <ActionIcon>
              <IconArrowLeft />
            </ActionIcon>

            <Title order={2}>RPG</Title>

            <ActionIcon>
              <IconMenu2 />
            </ActionIcon>
          </Flex>
        </Card>
      </Flex>

      <Flex direction="column" gap="md" mx="md" my={80}>
        {
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((_e, i) =>
            <Card withBorder key={i}>{i}</Card>
          )
        }
      </Flex>

      <Flex pos="fixed" maw={theme.breakpoints.sm} w="100%" h={48} bottom={0} style={{ zIndex: 1000, background: theme.colors.dark[7] }}>
        <Card withBorder m="md" w="100%" h="100%" bottom={32}>
          <Flex h="100%" direction="row" align="center" justify="center" gap="md">
            <ActionIcon>
              <IconHome />
            </ActionIcon>

            <ActionIcon>
              <IconMap />
            </ActionIcon>

            <ActionIcon>
              <IconBackpack />
            </ActionIcon>
          </Flex>
        </Card>
      </Flex>
    </>
  )
}

export default Home