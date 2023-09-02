import { MantineProvider } from "@mantine/core";
import { Outlet, ScrollRestoration } from "react-router-dom"
import { theme } from "./styles/theme";

function App() {
  return (
    <MantineProvider theme={theme} withNormalizeCSS withGlobalStyles>
      <Outlet />
      <ScrollRestoration />
    </MantineProvider>
  )
}

export default App
