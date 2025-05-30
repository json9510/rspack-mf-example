import { Box, styled } from "@mui/material";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const SearchContainer: any = styled(Box)(() => ({
  padding: "16px",
  width: "100%",
  // height: "100px",
  // boxSizing: "border-box",
  borderRadius: "12px",
}));

export default SearchContainer;
