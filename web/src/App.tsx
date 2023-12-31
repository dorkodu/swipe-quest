import { ActionIcon, Card, Flex, Image, MantineProvider, MediaQuery, Title, useMantineTheme } from "@mantine/core"
import { IconArrowLeft, IconBackpack, IconHome, IconMap, IconMenu2 } from "@tabler/icons-react";
import { Outlet, ScrollRestoration, useLocation, useNavigate } from "react-router-dom"
import { theme as _theme } from "./styles/theme";
import { useAppStore } from "./stores/appStore";
import { useEffect } from "react";
import ItemPickerModal from "./components/_game/modals/ItemPickerModal";
import ItemInfoModal from "./components/_game/modals/ItemInfoModal";
import UpdateSWModal from "./components/modals/UpdateSWModal";
import MonsterFightModal from "./components/_game/modals/MonsterFightModal";
import MonsterInfoModal from "./components/_game/modals/MonsterInfoModal";

function App() {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const route = useAppStore(state => state.route);

  useEffect(() => {
    if (location.pathname.indexOf("/home") !== -1) useAppStore.setState(s => { s.route = "home" });
    else if (location.pathname.indexOf("/map") !== -1) useAppStore.setState(s => { s.route = "map" });
    else if (location.pathname.indexOf("/inventory") !== -1) useAppStore.setState(s => { s.route = "inventory" });
    else if (location.pathname.indexOf("/menu") !== -1) useAppStore.setState(s => { s.route = "menu" });
    else useAppStore.setState(s => { s.route = "any" });
  }, [location.pathname]);

  return (
    <MantineProvider theme={_theme} withNormalizeCSS withGlobalStyles>

      <Flex direction="column" maw={theme.breakpoints.sm} mx="auto">
        <Flex pos="fixed" maw={theme.breakpoints.sm} w="100%" h={48} top={0} style={{ zIndex: 100, background: theme.colors.dark[7] }}>
          <Card withBorder m="md" w="100%" h="100%">
            <Flex h="100%" direction="row" align="center" justify="space-between">
              <ActionIcon
                style={route !== "home" ? {} : { visibility: "hidden" }}
                onClick={() => navigate("/home")}
              >
                <IconArrowLeft />
              </ActionIcon>

              <Flex align="center" gap="xs">
                <Image src="/icon-512.png" width={32} height={32} style={{ imageRendering: "pixelated" }} />
                <MediaQuery largerThan={360} styles={{ display: "none" }}>
                  <Title order={3}>SwipeQuest</Title>
                </MediaQuery>
                <MediaQuery smallerThan={360} styles={{ display: "none" }}>
                  <Title order={2}>SwipeQuest</Title>
                </MediaQuery>
              </Flex>

              <ActionIcon
                color={route === "menu" ? "green" : undefined}
                onClick={() => navigate("/menu")}
              >
                <IconMenu2 />
              </ActionIcon>
            </Flex>
          </Card>
        </Flex>

        <Outlet />

        <Flex pos="fixed" maw={theme.breakpoints.sm} w="100%" h={48} bottom={0} style={{ zIndex: 100, background: theme.colors.dark[7] }}>
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
      </Flex>


      {/* Modals */}
      <UpdateSWModal />
      <ItemPickerModal />
      <MonsterInfoModal />
      <ItemInfoModal />
      <MonsterFightModal />

      <ScrollRestoration />
    </MantineProvider>
  )
}

export default App
