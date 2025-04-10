import React = require("react");
import { ThemeProvider as NextThemesProvider } from "next-themes";
// biome-ignore lint/style/useImportType: <explanation>
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  defaultTheme?: "light" | "dark" | "system";
}

export const ThemeProvider = ({ children, defaultTheme = "light" }: Props) => {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme={defaultTheme}
      enableSystem
    >
      {children}
    </NextThemesProvider>
  );
};
