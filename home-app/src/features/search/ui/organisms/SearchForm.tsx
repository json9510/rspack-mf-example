import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SearchIcon from "@mui/icons-material/Search";
import { Autocomplete, Box, TextField } from "@mui/material";
import React from "react";
import { SearchRepositoryImpl } from "../../infraestructure/searchRepositoryImpl";
import { useSearchStore } from "../../model/search-store";
import SearchContainer from "./SearchContainer";
import { useNavigate } from "react-router-dom";
import { SearchUseCase } from "../../application/SearchUseCase";

const SearchForm: React.FC = () => {
  const navigate = useNavigate();
  const { setQuery, query, clearResults, setLoading, loading, results } =
    useSearchStore();

  const searchRepository = new SearchRepositoryImpl();
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const searchUseCase = React.useMemo(() => {
    return new SearchUseCase(searchRepository, {
      setLoading,
    });
  }, [setLoading]);

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    clearResults();
    if (!query) return;
    searchUseCase.execute(query);
    navigate("/results");
  };

  return (
    <SearchContainer>
      <form onSubmit={handleSearch}>
        <Autocomplete
          disabled={loading && !results}
          disablePortal
          freeSolo
          // value={query}
          options={[]}
          sx={{ width: "100%" }}
          getOptionLabel={(option: string) => option}
          renderOption={(props, option) => {
            return (
              <Box
                component="li"
                {...props}
                sx={{
                  display: "flex",
                  gap: 1,
                }}
              >
                <AccessTimeIcon />
                {option}
              </Box>
            );
          }}
          onChange={(_, value) => {
            if (value) setQuery(value);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              InputProps={{
                ...params.InputProps,
                startAdornment: <SearchIcon />,
              }}
              sx={{
                width: "100%",
                borderRadius: "14px",
                background: "white",
              }}
            />
          )}
        />
      </form>
    </SearchContainer>
  );
};

export default SearchForm;
