import { ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { getTheme } from "./getTheme";
import { useEffect } from "react";
import { useBrandingStore } from "../brandingStore";

const AppThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { primaryColor, secondaryColor } = useBrandingStore();
  const theme = getTheme(primaryColor, secondaryColor);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--color-primary",
      theme.palette.primary.main
    );
    document.documentElement.style.setProperty(
      "--color-secondary",
      theme.palette.secondary.main
    );
  }, [theme]);

  return (
    <NextThemesProvider attribute="class">
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </NextThemesProvider>
  );
};

export default AppThemeProvider;
