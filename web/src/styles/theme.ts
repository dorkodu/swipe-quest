import { MantineTheme, MantineThemeOverride } from "@mantine/core";

export const theme: MantineThemeOverride = {
  globalStyles: (_theme: MantineTheme) => ({
    body: {
      overflowY: "scroll",
      maxWidth: _theme.breakpoints.sm,
      margin: "0 auto",
    },
  }),

  colorScheme: "dark",
  primaryColor: "green",

  defaultRadius: "md",
  cursorType: "pointer",
  focusRing: "auto",
  loader: "dots",
}