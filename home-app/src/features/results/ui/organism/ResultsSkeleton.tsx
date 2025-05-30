import { Box, Grid, Skeleton } from "@mui/material";
import React from "react";
import ResultBox from "../atom/ResultsBox";

const n = 5;

const ResultsSkeleton = () => {
  return (
    <Grid container rowSpacing={2}>
      {Array.from({ length: n }, (_, i) => i + 1).map((el) => (
        <Grid size={{ xs: 12 }} key={`sk-${el}`}>
          <ResultBox>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  alignItems: "center",
                }}
              >
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton variant="rounded" width={65} height={22} />
              </Box>
            </Box>
            <Box sx={{ mt: 1 }}>
              <Skeleton variant="text" />
              <Skeleton variant="text" />
            </Box>
          </ResultBox>
        </Grid>
      ))}
    </Grid>
  );
};

export default ResultsSkeleton;
