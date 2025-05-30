import { Box, Typography } from "@mui/material";
import React from "react";
import SearchForm from "../../features/search/ui/organisms/SearchForm";

const Search = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        flexDirection: "column",
        gap: 3,
        padding: 2,
      }}
    >
      <Box>
        <Typography
          sx={{
            fontSize: "48px",
            fontWeight: 700,
            color: "var(--color-primary)",
          }}
        >
          Te damos la bienvenida
        </Typography>
        <Typography
          sx={{
            fontSize: "28px",
            color: "var(--color-primary)",
          }}
        >
          Accede rápidamente a lo que necesitas
        </Typography>
      </Box>
      <Box>
        <SearchForm />
        <Typography
          sx={{
            mt: 1,
            fontSize: "16px",
            color: "var(--color-primary)",
          }}
        >
          Te ayudará a encontrar fácilmente información sobre fronteras,
          SmartBit, ESS, MP, lead, tagname, clientes y medidores.
        </Typography>
      </Box>
    </Box>
  );
};

export default Search;
