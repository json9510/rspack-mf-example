import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

interface Props {
  bgcolor: string;
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const IconContainer: any = styled(Box)<Props>(({ bgcolor }) => ({
  backgroundColor: bgcolor,
  height: "40px",
  width: "40px",
  padding: "4px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "6px",
}));

export default IconContainer;
