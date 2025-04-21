import { Box, TextField, Typography } from "@mui/material";
import { useThemeStore } from "../../branding/theme/themeStore";

const ColorPicker = () => {
  const primary = useThemeStore((s) => s.primaryColor);
  const setPrimary = useThemeStore((s) => s.setPrimaryColor);

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <Typography>Color principal:</Typography>
      <input
        type="color"
        value={primary}
        onChange={(e) => setPrimary(e.target.value)}
        style={{ width: 40, height: 40, border: "none" }}
      />
      <TextField
        label="Código"
        size="small"
        value={primary}
        onChange={(e) => setPrimary(e.target.value)}
      />
    </Box>
  );
};

export default ColorPicker;
