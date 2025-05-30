import { Box, CircularProgress, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useRef, useState } from "react";
import SearchForm from "../../features/search/ui/organisms/SearchForm";
import { useSearchStore } from "../../features/search/model/search-store";
import ResultsGrid from "../../features/results/ui/organism/ResultsGrid";

const Results = () => {
  const { results, query, loading } = useSearchStore();
  const [visibleCount, setVisibleCount] = useState(15);
  const observerRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && visibleCount < results.length) {
        setVisibleCount((prevCount) => prevCount + 15);
      }
    });

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [visibleCount, results.length]);

  return (
    <Box
      sx={{ mx: "auto", width: "100%", ml: 5, mt: "50px", marginLeft: "0px" }}
    >
      <SearchForm />
      <Box sx={{ py: "15px" }}>
        {results.length > 0 ? (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 1,
              }}
            >
              <Typography
                sx={{
                  fontSize: "28px",
                }}
              >
                Resultados
              </Typography>
            </Box>

            <ResultsGrid visibleCount={visibleCount} />
            <div
              ref={observerRef}
              style={{
                height: "20px",
                background: "transparent",
              }}
            />
          </>
        ) : (
          !loading &&
          query && (
            <Typography color="error" sx={{ my: 2 }}>
              Sin resultados
            </Typography>
          )
        )}

        <Box
          sx={{
            display: "flex",
            justifyItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          {loading && <CircularProgress sx={{ my: 3 }} />}
        </Box>
      </Box>
    </Box>
  );
};

export default Results;
