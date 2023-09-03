import { ActionIcon, Card, Flex, MantineProvider, Title, useMantineTheme } from "@mantine/core"
import { IconArrowLeft, IconBackpack, IconHome, IconMap, IconMenu2 } from "@tabler/icons-react";
import { Outlet, ScrollRestoration, useLocation, useNavigate } from "react-router-dom"
import { theme as _theme } from "./styles/theme";
import { useAppStore } from "./stores/appStore";
import { useEffect } from "react";

function App() {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const route = useAppStore(state => state.route);

  useEffect(() => {
    if (location.pathname.indexOf("/home") !== -1) useAppStore.setState(s => { s.route = "home" });
    else if (location.pathname.indexOf("/map") !== -1) useAppStore.setState(s => { s.route = "map" });
    else if (location.pathname.indexOf("/inventory") !== -1) useAppStore.setState(s => { s.route = "inventory" });
    else useAppStore.setState(s => { s.route = "any" });
  }, [location.pathname]);

  return (
    <MantineProvider theme={_theme} withNormalizeCSS withGlobalStyles>

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

      <Outlet />

      <Flex pos="fixed" maw={theme.breakpoints.sm} w="100%" h={48} bottom={0} style={{ zIndex: 1000, background: theme.colors.dark[7] }}>
        <Card withBorder m="md" w="100%" h="100%" bottom={32}>
          <Flex h="100%" direction="row" align="center" justify="center" gap="md">
            <ActionIcon
              color={route === "home" ? "green" : undefined}
              onClick={() => navigate("/home")}
            >
              <IconHome />
            </ActionIcon>

            <ActionIcon
              color={route === "map" ? "green" : undefined}
              onClick={() => navigate("/map")}
            >
              <IconMap />
            </ActionIcon>

            <ActionIcon
              color={route === "inventory" ? "green" : undefined}
              onClick={() => navigate("/inventory")}
            >
              <IconBackpack />
            </ActionIcon>
          </Flex>
        </Card>
      </Flex>

      <ScrollRestoration />
    </MantineProvider>
  )
}

export default App
