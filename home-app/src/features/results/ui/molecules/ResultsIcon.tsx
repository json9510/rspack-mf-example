import { Box, Chip } from "@mui/material";
import type { Results } from "../../domain/results";
import React from "react";
import IconContainer from "../atom/IconContainer";

interface Props {
  resultSchema: Results;
}

const ResultIcon = ({ resultSchema }: Props) => {
  const { icon, name, mainColor } = resultSchema;
  return (
    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
      <IconContainer bgcolor={icon.bgcolor}>{icon.icon}</IconContainer>
      <Chip
        variant="outlined"
        label={name}
        size="small"
        sx={{
          color: mainColor,
          borderColor: mainColor,
        }}
      />
    </Box>
  );
};

export default ResultIcon;
