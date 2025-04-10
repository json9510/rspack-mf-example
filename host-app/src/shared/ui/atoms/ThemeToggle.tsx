import React = require("react");
import { Button } from "../../../components/ui/button";
import { useTheme } from "next-themes";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      cambiar a {theme === "dark" ? "Light" : "Dark"}
    </Button>
  );
};

export default ThemeToggle;
