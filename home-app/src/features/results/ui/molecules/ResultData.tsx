import { Box, Typography, type SxProps } from "@mui/material";
import React from "react";
import type { Results, ResultsResponse } from "../../domain/results";

interface Props {
  resultSchema: Results;
  result: ResultsResponse;
}

const mainLabelStyles: SxProps = {
  color: "--var(--enerbit-primary)",
  fontWeight: 700,
  fontSize: "16px",
};
const secondaryLabelStyles: SxProps = {
  color: "--var(--enerbit-primary)",
  fontSize: "16px",
};

const ResultData = ({ result, resultSchema }: Props) => {
  return (
    <>
      {resultSchema.labels.map((label, index) => (
        <Box
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          key={index}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mt: label.isMain ? 0 : 1,
          }}
        >
          {label.icon ?? null}
          <Typography
            sx={label.isMain ? mainLabelStyles : secondaryLabelStyles}
          >
            <strong>{label.name}: </strong>
            {label.formatFn
              ? label.formatFn(result.meta_data)
              : result.meta_data[label.key]}
          </Typography>
        </Box>
      ))}
    </>
  );
};

export default ResultData;
