import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const ResultBox: any = styled(Box)(() => ({
  minWidth: "104px",
  minHeight: "200px",
  maxHeight: "200px",
  border: "1px solid",
  borderColor: "var(--color-primary)",
  borderRadius: "12px",
  padding: "12px",
  cursor: "pointer",
}));

export default ResultBox;
