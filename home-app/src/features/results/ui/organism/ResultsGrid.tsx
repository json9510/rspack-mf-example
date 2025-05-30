import { Grid } from "@mui/material";
import { useSearchStore } from "../../../search/model/search-store";
import ResultsCard from "./ResultsCard";
import React from "react";

const ResultsGrid = ({ visibleCount }: { visibleCount: number }) => {
  const { results } = useSearchStore();

  return (
    <Grid container spacing={2} width={"100%"}>
      {results.slice(0, visibleCount).map((result) => (
        <Grid key={result.id} size={{ xs: 12, md: 4 }}>
          <ResultsCard result={result} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ResultsGrid;
