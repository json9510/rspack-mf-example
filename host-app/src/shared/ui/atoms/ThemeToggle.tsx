import { useTheme as useNextTheme } from "next-themes";
import { IconButton, Tooltip } from "@mui/material";
import { LightMode, DarkMode } from "@mui/icons-material";

const ThemeToggleButton = () => {
  const { theme, setTheme } = useNextTheme();
  const isDark = theme === "dark";

  return (
    <Tooltip title="Cambiar tema">
      <IconButton
        color="primary"
        onClick={() => setTheme(isDark ? "light" : "dark")}
      >
        {isDark ? <LightMode /> : <DarkMode />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggleButton;
