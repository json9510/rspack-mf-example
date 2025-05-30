import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, Chip, IconButton } from "@mui/material";
import React from "react";
import { RESULTS_PER_ENTITY } from "../../domain/config/constants";
import type { ResultsResponse } from "../../domain/results";
import { buildUrl } from "../../lib";
import ResultsBox from "../atom/ResultsBox";
import ResultData from "../molecules/ResultData";
import ResultIcon from "../molecules/ResultsIcon";
import { useNavigate } from "react-router-dom";
interface Props {
  result: ResultsResponse;
}

const ResultsCard = ({ result }: Props) => {
  const navigate = useNavigate();
  const resultSchema = RESULTS_PER_ENTITY[result.entity];

  const handleRedirection = () => {
    const { url } = resultSchema;
    const fullUrl = buildUrl(result.meta_data, url);
    navigate(fullUrl);
  };

  return (
    <ResultsBox>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <ResultIcon resultSchema={resultSchema} />
        <IconButton onClick={handleRedirection}>
          <ArrowForwardIcon />
        </IconButton>
      </Box>
      <Box sx={{ mt: 1 }}>
        <ResultData resultSchema={resultSchema} result={result} />
      </Box>

      {result?.meta_data?.tag_name && (
        <Box
          sx={{
            overflowX: "auto",
            display: "flex",
            flexWrap: "nowrap",
            "&::-webkit-scrollbar": {
              height: "6px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "rgba(0,0,0,0.05)",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(0,0,0,0.15)",
              borderRadius: "3px",
            },
            pb: 1,
          }}
        >
          {result?.meta_data?.tag_name.map((tag: string) => (
            <Chip label={tag} key={tag} sx={{ mr: 1, mt: 1 }} />
          ))}
        </Box>
      )}
    </ResultsBox>
  );
};

export default ResultsCard;
